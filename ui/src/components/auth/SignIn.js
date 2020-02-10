import React, {Fragment, useEffect} from "react";
import './SignIn.css'
import {Form, Formik, useField,} from "formik";
import {Button, CircularProgress, makeStyles, TextField} from "@material-ui/core";
import {clearingError, login} from "../../redux/modules/auth";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";


const useStyles = makeStyles(theme => {
    return {
        errorMessage: {color: theme.palette.error.dark, textAlign: "center"},
        dialog: {width: '300px', height: '200px', margin: '10px auto',border:'2px solid yellow'},
        field_input: {width: '100%'},

    };
});


const MyTextField = ({placeholder, type, ...props}) => {
    const [field] = useField(props)

    return (
        <TextField placeholder={placeholder} type={type}{...field}
                   style={{width: '100%', paddingBottom: '10px', textAlign: "center"}} onBlur={props.handleBlur} margin="dense" variant="outlined"/>
    )
}

const SignInForm = (props) => {
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const error = useSelector(state => state.auth.error);


    const loginDispatch = useDispatch();
    const errorDispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};
    const t = async (userData) => {

        await loginDispatch(login(userData));
        console.log("after await");
        return error;
    }


    const handlerSubmit = (values, actions) => {
        actions.setSubmitting(true);
        const userData = trimVal(values);
        const k = t(userData);
        actions.setSubmitting(false);
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.replace(from);
        } else {
            console.log("props ", props)
        }
    })
    const handleBlur = (e) => {
        errorDispatch(clearingError());
    }

    return (
        <div className={'box'}>
        <div className={classes.dialog}>
            <Formik initialValues={{username: "", password: ""}} onSubmit={handlerSubmit}>
                {({values, errors, touched, isSubmitting, dirty}) => (

                    <Fragment>
                        {(error) ? <div>{error}</div> : null}
                        <Form autoComplete="off">

                            <div className={classes.field_input}>
                                <MyTextField name='username' placeholder='имя пользователя' type={"input"}
                                             handleBlur={handleBlur}/>
                            </div>
                            <div className={classes.field_input}>
                                <MyTextField name='password' placeholder='пароль' type={"password"}/>
                            </div>
                            <div style={{height: '100px', display: 'flex', alignItems: 'center'}}>
                                <Button disabled={isSubmitting} type="submit" fullWidth variant={"outlined"}>
                                    {isSubmitting ? <CircularProgress size={24}/> : "Войти"}
                                </Button>
                            </div>
                        </Form>
                    </Fragment>
                )}
            </Formik>
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