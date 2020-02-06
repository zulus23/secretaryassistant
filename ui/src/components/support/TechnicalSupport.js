import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from "react-redux";
import ArrayStore from "devextreme/data/array_store";
import './TechnicalSupport.css'

import DataGrid, {Column, HeaderFilter} from "devextreme-react/data-grid";
import HeaderSection from "../common/HeaderSection";


const TechnicalSupport = (props) => {
    const supportLoad = useSelector(state => state.search.supports, shallowEqual);

    const isLoading = useSelector(state => state.search.loadingSupport, shallowEqual);

    const gridRef = React.createRef();
    const dataSource = new ArrayStore({
        key: ['enterprise', 'nameEmployee'],
        data: supportLoad
    });
    useEffect(() => {
        if(isLoading) {
            gridRef.current.instance.beginCustomLoading();
        }
        else gridRef.current.instance.endCustomLoading();
    },[isLoading,gridRef]);


    return (

        <div  className='gtk-support-list-container'>
            <HeaderSection>Техническая поддержка</HeaderSection>
            <div className='gtk-support-grid-container'>
            <DataGrid ref={gridRef} dataSource={dataSource} className='gtk-support-grid gtk-support-shadow'
                      showColumnLines={true}
                      showRowLines={true}
                      showBorders={true}

            >
                <Column caption={'Предприятие'} dataField={'enterprise'} width={120}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Тип '} dataField={'typeSupport'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Ф.И.О.'} dataField={'nameEmployee'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Телефон'} dataField={'phone'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
            </DataGrid>
            </div>

        </div>

    );
};


export default TechnicalSupport;