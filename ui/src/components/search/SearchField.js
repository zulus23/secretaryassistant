import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {startSearch} from "../../redux/modules/search";
import { TextBox } from 'devextreme-react';
import './SearchField.css'


const SearchField = () => {
    const [searchValue,setSearchValue] = useState("")
    const searchDispach = useDispatch();

    const changeEventHandler = (e) => {
        const data = e.value;
        console.log(data);
        setSearchValue(data)
        const sendData = {
            searchValue:data,
            typeRequest:'company'
        }
        if(data.length > 3)
        searchDispach(startSearch(sendData));
    }
    return (

            <TextBox className='gtk-search-field p-shadow' placeholder='Введите имя компании, сотрудника или номер телефона'
                     showClearButton={true} onValueChanged={changeEventHandler} value={searchValue} valueChangeEvent='keyup'/>

    );
};

export default SearchField;