import {call, put, takeLatest,all} from 'redux-saga/effects'

export const AUTHENTICATED = 'gtk_authenticated_user';
export const UNAUTHENTICATED = 'gtk_unauthenticated_user';
export const AUTHENTICATION_ERROR = 'gtk_authentication_error';
export const AUTHENTICATION_ERROR_CLEAR = 'auth/AUTHENTICATION_ERROR_CLEAR';




const initialState = {
    authenticated: false,
    error: '',
    token: '',
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATED : {

            return {...state, authenticated: true, token: action.payload.token, error: ''}
        }
        case  AUTHENTICATION_ERROR : {
            return {...state, error: action.payload, authenticated: false, token: ''}
        }
        case UNAUTHENTICATED : {
            return {...state,authenticated: false,token: ''}
        }
        case AUTHENTICATION_ERROR_CLEAR : {
            return  {...state,error: ''}
        }
        default : {
            return state
        }
    }
}

export function* authSaga() {
    yield all([ takeLatest(USER_SIGNIN, authorizathion),takeLatest(USER_SIGNOUT,userSignout)]);
}

function* authorizathion(user) {
    try {
        const userData = user.payload;
        let token = yield call(api.authentication, userData);
        yield put(successAuthorized(token.data));
        localStorage.setItem('userToken', token.data);
    } catch (e) {

        yield put({
            type: AUTHENTICATION_ERROR,
            payload: e.message
        })
    }

}

function* userSignout() {
    try {
        localStorage.removeItem('userToken');
        yield put({type:UNAUTHENTICATED});

    } catch (e) {

        yield put({
            type: AUTHENTICATION_ERROR,
            payload: e.message
        })
    }
}



const successAuthorized = (data) => {
    return {
        type: AUTHENTICATED,
        payload: {token: data}
    }
}

