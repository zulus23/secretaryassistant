import React from 'react';
import DataGrid, {
    Column,
    ColumnFixing,
    FilterRow,
    GroupPanel,
    HeaderFilter,
    Pager,
    Paging
} from 'devextreme-react/data-grid'
import {LoadPanel} from 'devextreme-react/load-panel';
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import './SearchResult.css'
import {selectedSearchRow} from "../redux/modules/search";

const position = {of: '#gridmain'};

const SearchResult = (props) => {
    const resultSearchData = useSelector(state => state.search.searchResult, shallowEqual);
    const isLoading = useSelector(state => state.search.searching, shallowEqual);
    const dispatchSelectRecord = useDispatch()
    const onSelectionChanged = ({selectedRowsData}) => {
        const data = selectedRowsData[0];
        data && dispatchSelectRecord(selectedSearchRow({codeCompany: data.code}));

    }

    return (
        <div id={"gridmain"} className='gtk_search_result_container'>
            <DataGrid style={{height: '100%', width: '100%'}}
                      showColumnLines={true}
                      showRowLines={true}
                      showBorders={true}
                      allowColumnReordering={true}
                      allowColumnResizing={true}
                      columnAutoWidth={true}
                      selection={{mode: 'single'}}
                      columnResizingMode={'widget'}
                      keyExpr={['code', 'seq']}
                      dataSource={resultSearchData}
                      onSelectionChanged={onSelectionChanged}
                      >
                />
                <FilterRow visible={true}/>
                <GroupPanel visible={true}/>
                <HeaderFilter visible={true}/>
                {/*  <ColumnChooser enabled={true} mode={'select'} width={300} height={400}/>*/}
                <ColumnFixing enabled={true}/>
                <Paging defaultPageSize={10}/>
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                    showInfo={true}/>
                <Column caption={'Код'} dataField={'code'} width={80}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Головная компания'} dataField={'rootCompany'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Наименование'} dataField={'name'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>

            </DataGrid>

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

export default SearchResult;