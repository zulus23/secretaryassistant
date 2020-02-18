import React, {useEffect, useState} from "react";
import './SignIn.css'
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

import Form, {ButtonItem, GroupItem, Label, SimpleItem} from 'devextreme-react/form';
import {clearingError, login} from "../../redux/modules/auth";


const SignInForm = (props) => {
    const [userInfo, setUserInfo] = useState({username: '', password: ''});
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const error = useSelector(state => state.auth.error);
    const loginDispatch = useDispatch();
    const errorDispatch = useDispatch();

    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};

    const handlerSubmit = (e) => {
        const userData = trimVal(userInfo);

        loginDispatch(login(userData));
        e.preventDefault();
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.replace(from);
        }

    }, [isAuthenticated, from, history]);

    const userFieldOptions ={

        valueChangeEvent:'keyup'
    }

    const passwordOptions = {
        mode: 'password',
        valueChangeEvent:'keyup'

    }
    const buttonOptions = {
        text: 'Войти',
        useSubmitBehavior: true
    };
    const fieldDataChangeHandler = (e) => {
        errorDispatch(clearingError());
    }


    return (
        <div className={'content'}>

            <div className='gtk-auth-panel'>

                <form onSubmit={handlerSubmit} className='gtk-auth-form'>
                    {(error) ?
                        <div className='gtk-auth-error'><p>{error}</p></div> : ''}
                    <Form formData={userInfo} autoComplete="off" onFieldDataChanged={fieldDataChangeHandler}
                          colCount={1} labelLocation={'top'}>

                        <GroupItem colCount={1}>
                            <SimpleItem dataField={'username'} editorType="dxTextBox" isRequired colSpan={1} editorOptions={userFieldOptions} cssClass='gtk-sing-username'>
                                <Label text={'Имя пользователя'} className='gtk-sign-label'  alignment='center'/>
                            </SimpleItem>
                        </GroupItem>

                        <GroupItem colCount={1}>
                            <SimpleItem dataField={'password'} editorType="dxTextBox" editorOptions={passwordOptions} cssClass='gtk-sign-password'>
                                <Label text={'Пароль'} className='gtk-sign-label' alignment='center'/>
                            </SimpleItem>
                        </GroupItem>
                        <GroupItem colCount={1}>
                            <ButtonItem cssClass={'gtk-button'} horizontalAlignment="center"
                                        buttonOptions={buttonOptions} />
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