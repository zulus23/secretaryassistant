import React from 'react';
import {shallowEqual, useSelector} from "react-redux";
import List from 'devextreme-react/list';
import ArrayStore from 'devextreme/data/array_store';

const ManagerCompany = (props) => {
    const managerLoad = useSelector(state => state.search.detailResult, shallowEqual);
    const dataSource = new ArrayStore({
        key: ['enterprise','name'],
        data: managerLoad
    });
    return (
        <div style={{width:'100%'}}>
            <List dataSource={dataSource}  height="100%" itemRender={ManagerInfo} />
        </div>
    );
};

 function ManagerInfo(manager) {
    return (
        <div className="product">
            <div>{manager.enterprise}</div>
            <div>{manager.typeManager}</div>
            <div>{manager.name}</div>
            <div>{manager.phone}</div>

        </div>
    );
}

export default ManagerCompany;