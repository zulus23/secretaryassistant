import React, {useEffect} from 'react';
import DataGrid, {Column, ColumnFixing, FilterRow, GroupPanel, HeaderFilter} from 'devextreme-react/data-grid'
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import './SearchResult.css'
import {selectedSearchRow} from "../redux/modules/search";


const SearchResult = (props) => {
    const resultSearchData = useSelector(state => state.search.searchResult, shallowEqual);
    const isLoading = useSelector(state => state.search.searching, shallowEqual);
    const token = useSelector(state => state.auth.token, shallowEqual);
    const gridRef = React.createRef();
    useEffect(() => {
        if(isLoading) {
            gridRef.current.instance.beginCustomLoading();
        }
        else gridRef.current.instance.endCustomLoading();
    },[isLoading,gridRef]);

    const dispatchSelectRecord = useDispatch()
    const onSelectionChanged = ({selectedRowsData}) => {
        const data = selectedRowsData[0];
        data && dispatchSelectRecord(selectedSearchRow({codeCompany: data.code,token:token}));

    }




    return (
        <div id={"gridmain"} className='gtk-search-result-container'>
          {/*  <HeaderSection>Клиенты</HeaderSection>*/}
            <div className='gtk-search-result-grid-container'>
            <DataGrid ref={gridRef} className='gtk-search-result-grid gtk-search-result-shadow'
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
                {/*<Paging defaultPageSize={10}/>
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                    showInfo={true}/>*/}
                <Column caption={'Код'} dataField={'code'} width={80}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Головная компания'} dataField={'rootCompany'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>
                <Column caption={'Наименование'} dataField={'name'}
                        alignment={'center'}><HeaderFilter allowSearch={true}/></Column>

            </DataGrid>
            </div>

        </div>
    );
};

export default SearchResult;