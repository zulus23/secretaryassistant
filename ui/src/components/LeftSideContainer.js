import React from 'react';
import './LeftSideContainer.css'
import SearchResult from "./SearchResult";
import SearchPhoneResult from "./phone/SearchPhoneResult";
const LeftSideContainer = () => {
    return (
        <div className='gtk-left-side-container'>
            <div className='gtk-grid-left-side-company'>
                <SearchResult/>
            </div>
            <div className='gtk-grid-left-side-phone'>
                <SearchPhoneResult/>
            </div>
        </div>
    );
};

export default LeftSideContainer;