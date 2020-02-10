import React from 'react';
import './App.css'

import ruMessages from 'devextreme/localization/messages/ru.json';
import 'devextreme-intl';
import {loadMessages, locale} from 'devextreme/localization';
import HeaderContainer from "./components/HeaderContainer";
import MainSideContainer from "./components/MainSideContainer";
import {useSelector} from "react-redux";


const PrivateRoute = ({children, ...rest}) => {
    const isAuthenticated = useSelector(state => state.search.authenticated);

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}




function App() {
    loadMessages(ruMessages);
    locale('ru');

    return (
        <div   className="gtk-main-container">

            <div id={'notify'} className='header'>
               <HeaderContainer/>
            </div>
           {/* <div className='leftside'>
                <LeftSideContainer/>
            </div>
            <div className='rightside'>
                <DetailContainer/>
            </div>*/}
            <div className={'main-side'}>
                <MainSideContainer/>
            </div>

            <div className='footer'>

            </div>

        </div>
    );
}

export default App;
