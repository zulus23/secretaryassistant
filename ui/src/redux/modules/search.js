import {call, put, takeLatest,all} from 'redux-saga/effects'
import notify from 'devextreme/ui/notify';
import * as api from '../../api'


export const GTK_START_SEARCH = 'GTK_START_SEARCH';
export const GTK_END_SEARCH = 'GTK_END_SEARCH';
export const GTK_SELECTED_ROW = 'GTK_SELECTED_ROW';
export const GTK_FINISH_LOAD_MANAGER_SELECTED_ROW = 'GTK_FINISH_LOAD_MANAGER_SELECTED_ROW';
export const GTK_FINISH_LOAD_SUPPORT_SELECTED_ROW = 'GTK_FINISH_LOAD_SUPPORT_SELECTED_ROW';
export const GTK_START_LOAD_DETAIL = 'GTK_START_LOAD_DETAIL';
export const GTK_FINISH_SEARCH_PHONE = 'GTK_FINISH_SEARCH_PHONE';
export const GTK_ERROR_SEARCH = 'GTK_ERROR_SEARCH';
export const GTK_ERROR_LOAD_DETAIL = 'GTK_ERROR_LOAD_DETAIL';


const initialState = {
    search: "",
    searchResult:[],
    error:{},
    searching : false,
    loadingManager: false,
    loadingSupport: false,
    searchingPhone: false,
    managers:[],
    supports:[],
    phones:[],
    authenticated:null,

}



export default function reducer(state = initialState, action) {
   switch (action.type) {
       case GTK_START_SEARCH : {
           return {...state,searching: true,searchingPhone: true,
                    managers: [],supports: [],
                    error: []}
       }
       case GTK_END_SEARCH : {

           return {...state,searching: false, searchingPhone: false, searchResult: action.payload}
       }
       case GTK_START_LOAD_DETAIL : {
           return {...state,loadingManager:true,loadingSupport:true}
       }

       case GTK_FINISH_LOAD_MANAGER_SELECTED_ROW :{
           return {...state, managers: action.payload,loadingManager:false}
       }
       case GTK_FINISH_LOAD_SUPPORT_SELECTED_ROW :{
           return {...state, supports: action.payload,loadingSupport:false}
       }
       case GTK_FINISH_SEARCH_PHONE :{

           return {...state,phones: action.payload,searchingPhone: false}
       }
       case GTK_ERROR_SEARCH : {
           return {...state,searching: false, searchingPhone: false,error: action.payload}
       }
       case GTK_ERROR_LOAD_DETAIL : {
           return {...state,loadingManager: false, loadingSupport: false,error: action.payload}
       }
       default: {
           return state
       }
   }
}

export function* searchSaga() {
   yield all([takeLatest(GTK_START_SEARCH,searching),takeLatest(GTK_SELECTED_ROW,loadDetailRow)]);
}

const showErrorNotification = (error) =>{

    notify({message:error, position: { at: 'right bottom',my:'right',of:'#notify'},width:'250px',height:'100px'},'error',        2000);
}


function* searching(data) {

    try {
       const searchRequest = data.payload.searchData;
       const token = data.payload.token;
       const result = yield call(api.searchCompanyByName,searchRequest,token);
       const resultPhone = yield call(api.searchPhoneByCodeAndName,searchRequest,token);
       yield put(finishSearch(result.data));
       yield put(finishSearchPhone(resultPhone.data));
   }catch (e) {
      yield put(errorSearch(e))
        showErrorNotification('Ошибка загрузки данных. Попробуйте еще раз.');
    }
}
function* loadDetailRow(data) {
    try{
       yield put(startLoadDetail());

       const codeCompany = {
           codeCompany:data.payload.codeCompany
       };
       const token = data.payload.token


       const manager = yield call(api.loadManager,codeCompany,token);
       const support = yield call(api.loadTechnicalSupport,codeCompany,token);
       yield put(finishLoadManager(manager.data));
       yield put(finishLoadSupport(support.data));

    }catch(e) {
        yield put(errorLoadDetail(e))
        showErrorNotification('Ошибка загрузки данных. Попробуйте еще раз.');
    }
}
export function startLoadDetail() {
    return {
        type:GTK_START_LOAD_DETAIL

    }
}



export function startSearch(data) {
    return {
        type:GTK_START_SEARCH,
        payload:data
    }
}
export function finishSearch(data) {
  return {
      type: GTK_END_SEARCH,
      payload: data
  }
}
export function selectedSearchRow(data) {
    return {
        type:GTK_SELECTED_ROW,
        payload:data
    }
}
export function finishLoadManager(data) {
    return {
        type:GTK_FINISH_LOAD_MANAGER_SELECTED_ROW,
        payload:data
    }
}
export function finishLoadSupport(data) {
    return {
        type:GTK_FINISH_LOAD_SUPPORT_SELECTED_ROW,
        payload:data
    }
}
export function  finishSearchPhone(data) {
    return {
        type:GTK_FINISH_SEARCH_PHONE,
        payload:data
    }
}
export function errorSearch(error) {

    return {
        type:GTK_ERROR_SEARCH,
        payload:error
    }
}
export function errorLoadDetail(error) {

    return {
        type:GTK_ERROR_LOAD_DETAIL,
        payload:error
    }
}