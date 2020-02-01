import React from 'react';
import './App.css'
import SearchField from "./components/search/SearchField";
import SearchResult from "./components/SearchResult";

import ruMessages from 'devextreme/localization/messages/ru.json';
import 'devextreme-intl';
import {loadMessages, locale} from 'devextreme/localization';
import DetailContainer from "./components/DetailContainer";
import HeaderContainer from "./components/HeaderContainer";


function App() {
    loadMessages(ruMessages);
    locale('ru');
    return (
        <div className="gtk-main-container">

            <div className='header'>
               <HeaderContainer/>
            </div>
            <div className='leftside'>
                <SearchResult/>
            </div>
            <div className='rightside'>
                <DetailContainer/>
            </div>
            <div className='footer'>

            </div>

        </div>
    );
}

export default App;
