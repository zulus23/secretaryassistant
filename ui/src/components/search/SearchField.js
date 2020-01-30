import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {startSearch} from "../../redux/modules/search";


const SearchField = () => {
    const [searchValue,setSearchValue] = useState("")
    const searchDispach = useDispatch();

    const changeEventHandler = (e) => {
        const data = e.target.value;
        console.log(data);
        setSearchValue(e.target.value)
        const sendData = {
            searchValue:data,
            typeRequest:'company'
        }
        if(data.length > 3)
        searchDispach(startSearch(sendData));
    }
    return (
        <div>
           <input type='text' onChange={changeEventHandler} value={searchValue}/>
        </div>
    );
};

export default SearchField;