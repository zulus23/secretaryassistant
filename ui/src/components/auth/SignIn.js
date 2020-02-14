import React, {Fragment, useEffect, useState} from "react";
import './SignIn.css'
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

import Form, {
    SimpleItem,
    GroupItem,
    Label, ButtonItem
} from 'devextreme-react/form';
import {login} from "../../redux/modules/auth";


const SignInForm = (props) => {
    const [userInfo, setUserInfo] = useState({username:'',password:''});

    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const error = useSelector(state => state.auth.error);


    const loginDispatch = useDispatch();
    const errorDispatch = useDispatch();

    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};
    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(" ------------------------- ", userInfo);
        const userData = trimVal(userInfo);
        console.log(" ------------------------- ", userData);
        loginDispatch(login(userData));
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.replace(from);
        } else {
            console.log("props ", props)
        }
    })
    const passwordOptions = {
        mode:'password'
    }
    const buttonOptions = {
        text: 'Войти',
        useSubmitBehavior: true
    };
    const fieldDataChangeHandler = (e) => {
        console.log(" fieldDataChangeHandler ", e);
    }

    return (
        <div className={'content'}>
            <div className='gtk-auth-panel'>
                <form  onSubmit={handlerSubmit} className='gtk-auth-form'>
                <Form  formData={userInfo}  autoComplete="off" onFieldDataChanged={fieldDataChangeHandler}
                       colCount={1} labelLocation={'top'}>

                    <GroupItem colCount={1}>
                        <SimpleItem dataField={'username'} editorType="dxTextBox" isRequired colSpan={1}>
                            <Label text={'Имя пользователя'} />
                        </SimpleItem>
                    </GroupItem>

                    <GroupItem colCount={1}>
                        <SimpleItem dataField={'password'} editorType="dxTextBox" editorOptions={passwordOptions}>
                            <Label text={'Пароль'}/>
                        </SimpleItem>
                    </GroupItem>
                    <GroupItem colCount={1}>
                        <ButtonItem cssClass={'gtk-button'} horizontalAlignment="center" buttonOptions={buttonOptions}  />
                    </GroupItem>
                </Form>
                </form>
            </div>


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