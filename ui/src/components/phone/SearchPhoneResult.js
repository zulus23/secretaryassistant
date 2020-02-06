import React, {useEffect} from 'react';
import './SearchPhoneResult.css'
import {shallowEqual, useSelector} from "react-redux";

import DataGrid, {Column, ColumnFixing, FilterRow, GroupPanel, HeaderFilter, Pager} from "devextreme-react/data-grid";


const SearchPhoneResult = () => {
    const resultSearchData = useSelector(state => state.search.phones, shallowEqual);
    const isLoading = useSelector(state => state.search.searchingPhone, shallowEqual);
    const gridRef = React.createRef();
    useEffect(() => {
        if(isLoading) {
            gridRef.current.instance.beginCustomLoading();
        }
        else gridRef.current.instance.endCustomLoading();
    },[isLoading,gridRef]);


    return (
        <div  className='gtk-phone-list-container'>
           {/* <HeaderSection>Телефоны</HeaderSection>*/}
            <div className='gtk-phone-grid-container'>
                <DataGrid ref={gridRef} className='gtk-phone-grid gtk-phone-shadow'
                          showColumnLines={true}
                          showRowLines={true}
                          showBorders={true}
                          allowColumnReordering={true}
                          allowColumnResizing={true}
                          columnAutoWidth={true}
                          selection={{mode: 'single'}}
                          //columnResizingMode={'widget'}
                          keyExpr={['fio']}
                          dataSource={resultSearchData}

                >
                    />
                    <FilterRow visible={true}/>
                    <GroupPanel visible={true}/>
                    <HeaderFilter visible={true}/>
                    {/*  <ColumnChooser enabled={true} mode={'select'} width={300} height={400}/>*/}
                    <ColumnFixing enabled={true}/>

                    <Pager
                        showPageSizeSelector={true}
                        allowedPageSizes={[10, 20, 50]}
                        showInfo={true}/>
                    <Column caption={'Предприятие'} dataField={'enterprise'} width={80}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    {/*<Column caption={'Адрес'} dataField={'enterpriseAddress'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    <Column caption={'Руководитель'} dataField={'chief'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>*/}
                    <Column caption={'Подразделение'} dataField={'department'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    <Column caption={'Должность'} dataField={'position'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    <Column caption={'Ф.И.О.'} dataField={'fio'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    <Column caption={'Вне.телефон'} dataField={'outerPhone'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    <Column caption={'Внут.телефон'} dataField={'innerPhone'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    <Column caption={'Email'} dataField={'email'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                    <Column caption={'Кабинет'} dataField={'cabNum'}
                            alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                </DataGrid>
            </div>

        </div>
    );
};

export default SearchPhoneResult;