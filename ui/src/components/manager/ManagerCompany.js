import React from 'react';
import {shallowEqual, useSelector} from "react-redux";

import ArrayStore from 'devextreme/data/array_store';
import './ManagerCompany.css'
import DataGrid, {
    Column,
    ColumnFixing,
    FilterRow,
    GroupPanel,
    HeaderFilter,
    Pager,
    Paging
} from 'devextreme-react/data-grid'
import HeaderSection from "../common/HeaderSection";
import {LoadPanel} from "devextreme-react/load-panel";

const position = {of: '#managerGrid'};

const ManagerCompany = (props) => {
    const managerLoad = useSelector(state => state.search.managers, shallowEqual);
    const isLoading = useSelector(state => state.search.loadingManager, shallowEqual);
    const dataSource = new ArrayStore({
        key: ['enterprise','name'],
        data: managerLoad
    });
    return (
        <div id={"managerGrid"} className='gtk-manager-list-container'>
            <HeaderSection>Ответственные менеджеры</HeaderSection>
            <div className='gtk-manager-grid-container'>
            <DataGrid dataSource={dataSource} className='gtk-manager-grid gtk-manager-shadow'
                      showColumnLines={true}
                      showRowLines={true}
                      showBorders={true}
            >
                <Column caption={'Предприятие'} dataField={'enterprise'} width={120}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Тип '} dataField={'typeManager'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Ф.И.О.'} dataField={'name'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Телефон'} dataField={'phone'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
            </DataGrid>
            </div>
            <LoadPanel
                shadingColor={'rgba(0,0,0,0.4)'}
                position={position}

                visible={isLoading}
                showIndicator={true}
                shading={true}
                showPane={true}

            />
        </div>
    );
};


export default ManagerCompany;