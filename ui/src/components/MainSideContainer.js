import React, {useState} from 'react';
import './MainSideContainer.css'
import SearchPhoneResult from "./phone/SearchPhoneResult";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import HeaderSection from "./common/HeaderSection";
import DetailContainer from "./DetailContainer";


const MainSideContainer = () => {
    const [tabIndex,setTabIndex] = useState(0)
    return (
        <div className='gtk-left-side-container'>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab style={{paddingBottom:'0',paddingTop:'0'}}><HeaderSection>Клиенты</HeaderSection></Tab>
                    <Tab style={{paddingBottom:'0',paddingTop:'0'}}><HeaderSection>Телефоны</HeaderSection></Tab>
                </TabList>

            <TabPanel  className={tabIndex === 0 ? 'gtk-tab-panel':''}>
                <div className='gtk-grid-left-side-company'>
                  {/*<SearchResult/>*/}
                  <DetailContainer/>
                </div>
            </TabPanel>
            <TabPanel  className={tabIndex === 1 ? 'gtk-tab-panel':''}>
                <div className='gtk-grid-left-side-company'>
                    <SearchPhoneResult/>
                </div>
            </TabPanel>
            </Tabs>
            {/*<div className='gtk-grid-left-side-company'>

            </div>
            <div className='gtk-grid-left-side-phone'>
                <SearchPhoneResult/>
            </div>*/}
        </div>
    );
};

export default MainSideContainer;