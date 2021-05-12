import {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom"
import useHttp from "../hooks/use-http";
import Form from "../components/Form/Form";
import FormGroup from "../components/FormGroup/FormGroup";
import Button from "../components/UI/Button/Button";

import InputContext from "../store/inputValue-context";
import AuthContext from "../store/auth-context";

import { formFieldLogin, getInputValue, onSubmitFormHelper, requestSettings} from "../utils/formFields";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [connectionInfo, setConnectionInfo] = useState("");
    const [formIsSend, setFormIsSend] = useState(false);
    const [token, setToken] = useState("");
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    //Récupération des valeurs des inputs
    const onGetEmail = getInputValue(email,setEmail);
    const onGetPassword = getInputValue(password, setPassword);

    //Retourne un objet User qui sera envoyé dans la requête POST et un Booléen si le formulaire est envoyé ou non
    const onSubmitForm = onSubmitFormHelper(setConnectionInfo, setFormIsSend);

    //Requête POST : Login => Vérification des identifiants de connexion
    const sendPostRequest = useHttp();
    useEffect(() => {
        if(formIsSend){
            const settings = requestSettings("http://localhost:3000/api/auth/login", connectionInfo);
            const tokenReturned = sendPostRequest(settings);
            setFormIsSend(false);

            //Enregistrement du token dans le localStorage
            tokenReturned.then(userToken => {
                setToken(userToken);
                authCtx.login(userToken);
                history.push('/home');
            });
        }
    }, [formIsSend, token, connectionInfo, sendPostRequest, authCtx, history])

    return (
        <InputContext.Provider value={{
            email,
            password
        }}>
            <Form onSubmitForm={onSubmitForm}>
                <FormGroup field={formFieldLogin.email} onGetInputValue={onGetEmail} formIsSend={formIsSend}/>
                <FormGroup field={formFieldLogin.password} onGetInputValue={onGetPassword} formIsSend={formIsSend}/>
                <Button type="submit">Valider</Button>
            </Form>
        </InputContext.Provider>
    );
};

export default Login;