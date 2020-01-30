import {call, put, takeLatest,all} from 'redux-saga/effects'
import * as api from '../../api'

export const GTK_START_SEARCH = 'GTK_START_SEARCH';
export const GTK_END_SEARCH = 'GTK_END_SEARCH';
export const GTK_SELECTED_ROW = 'GTK_SELECTED_ROW';
export const GTK_FINISH_LOAD_DETAIL_SELECTED_ROW = 'GTK_FINISH_LOAD_DETAIL_SELECTED_ROW';




const initialState = {
    search: "",
    searchResult:[],
    error:[],
    searching : false,
    detailResult:[]


}



export default function reducer(state = initialState, action) {
   switch (action.type) {
       case GTK_START_SEARCH : {
           return {...state,searching: true}
       }
       case GTK_END_SEARCH : {
           return {...state,searching: false, searchResult: action.payload}
       }
       case GTK_FINISH_LOAD_DETAIL_SELECTED_ROW :{
           return {...state,detailResult: action.payload}
       }
       default: {
           return state
       }
   }
}

export function* searchSaga() {
   yield all([takeLatest(GTK_START_SEARCH,searching),takeLatest(GTK_SELECTED_ROW,loadDetailRow)]);
}


function* searching(data) {
   try {
       const searchRequest = data.payload;
       const result = yield call(api.searchCompanyByName,searchRequest);
       console.log(searchRequest);
       console.log(result);
       yield put(finishSearch(result.data));
   }catch (e) {

   }
}
function* loadDetailRow(data) {
    try{
       const codeCompany = data.payload;
       const result = yield call(api.loadDetailRow,codeCompany);
       yield put(finishLoadDetailRow(result.data))
    }catch(e) {

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
export function finishLoadDetailRow(data) {
    return {
        type:GTK_FINISH_LOAD_DETAIL_SELECTED_ROW,
        payload:data
    }
}