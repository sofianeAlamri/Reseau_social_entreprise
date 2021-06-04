import {Switch, Route, Redirect} from "react-router-dom";
import {GuardedRoute, GuardProvider} from "react-router-guards"
import {requireLogin} from "./guards/required-login";
import Wrapper from "./components/layout/Wrapper/Wrapper";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home/Home";
import Header from "./components/layout/Header/Header";
import Navigation from "./components/layout/Navigation/Navigation";
import MainNavigationLink from "./components/MainMenuLink/MainMenuLink";


const App = () => {

    return (
        <Wrapper>
            <Header>
                <Navigation>
                    <MainNavigationLink/>
                </Navigation>
            </Header>
            <GuardProvider>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/logout">
                        <Redirect to="/" />
                    </Route>
                    <GuardedRoute path="/" component={Home} guards={[requireLogin]} meta={{auth:true}}/>
                    <GuardedRoute path="/login" exact component={Login} guards={[requireLogin]} meta={{ auth: false }} />
                    
                </Switch>
            </GuardProvider>
        </Wrapper>
    )
}

export default App;
