import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {startSearch} from "../../redux/modules/search";
import { TextBox } from 'devextreme-react';
import './SearchField.css'


const SearchField = () => {
    const [searchValue,setSearchValue] = useState("")
    const searchDispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const changeEventHandler = (e) => {
        const data = e.value;
        setSearchValue(data)
        const sendData = {
            token: token,
            searchData:{searchValue:data,typeRequest:'company'}
        }
        if(data.length > 3)
        searchDispatch(startSearch(sendData));
    }
    return (

            <TextBox className='gtk-search-field p-shadow' placeholder='Введите имя компании, сотрудника или номер телефона'
                     showClearButton={true} onValueChanged={changeEventHandler} value={searchValue} valueChangeEvent='keyup'/>

    );
};

export default SearchField;