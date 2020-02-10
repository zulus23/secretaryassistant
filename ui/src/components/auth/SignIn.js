import React, {Fragment, useEffect, useState} from "react";
import './SignIn.css'
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {Button, TextBox} from "devextreme-react";


const SignInForm = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const error = useSelector(state => state.auth.error);


    const loginDispatch = useDispatch();
    const errorDispatch = useDispatch();

    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};
    const handlerSubmit = (e) => {
        e.stopPropagation();

        //const userData = trimVal(values);

    }

    useEffect(() => {
        if (isAuthenticated) {
            history.replace(from);
        } else {
            console.log("props ", props)
        }
    })


    return (
        <div className={'box'}>
            <Fragment>
                {(error) ? <div>{error}</div> : null}
                <form autoComplete="off" onSubmit={handlerSubmit}>

                    <div>
                        <TextBox name='username' placeholder='имя пользователя' value={userName}
                                 valueChangeEvent='keyup'/>
                    </div>
                    <div>

                        <TextBox name='password' placeholder='пароль' value={password} valueChangeEvent='keyup'/>
                    </div>
                    <div style={{height: '100px', display: 'flex', alignItems: 'center'}}>
                        <Button type="submit">Войти</Button>
                    </div>
                </form>
            </Fragment>


        </div>
    )
}


const trimVal = obj => {
    if (typeof obj !== "object") {
        return;
    }

    let value;
    let output = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            value = obj[key].trim();
            output[key] = value;
        }
    }
    return output;
};


export default SignInForm