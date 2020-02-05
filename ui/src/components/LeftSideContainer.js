import React from 'react';
import './LeftSideContainer.css'
import SearchResult from "./SearchResult";
import SearchPhoneResult from "./phone/SearchPhoneResult";
import TabPanel from 'devextreme-react/tab-panel';

const dataSource = () => {
    return [{id:1,title:'Клиенты',template:<SearchResult/>},{id:2,title:'Телефоны',template:<SearchPhoneResult/>}]

}

const LeftSideContainer = () => {
    return (
        <div className='gtk-left-side-container'>
           <TabPanel>
               dataSource={dataSource}
               <SearchResult/>
           </TabPanel>

            {/*<div className='gtk-grid-left-side-company'>

            </div>
            <div className='gtk-grid-left-side-phone'>
                <SearchPhoneResult/>
            </div>*/}
        </div>
    );
};

export default LeftSideContainer;