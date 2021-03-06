import {httpRequest} from "../../../utils/httpRequest";
import {LOGIN} from "./types";
import { FORM_IS_SENDED } from "../form/type";

export const login = userDataConnect => {
    return dispatch => {
        const response = httpRequest(`${process.env.REACT_APP_DOMAIN}/api/auth/login`, "POST", userDataConnect);
        
        response().then(data =>{
           
            if(data.error) {
                throw new Error(data.error)
            }

            const {userId, token} = data.data;
            dispatch({
                type: LOGIN, value: {
                    isLoggedIn: !!token,
                    token,
                    userId
                }
            });
        }).catch(error => {
            dispatch({type: "ERROR", message: error.message, status:"error"})
        });
        dispatch({ type: FORM_IS_SENDED, isSend: false });
    }
}