import React from 'react';
import './DetailContainer.css'
import TechnicalSupport from "./support/TechnicalSupport";
import AddressDelivery from "./support/AddressDelivery";
import ManagerCompany from "./support/ManagerCompany";

const DetailContainer = () => {
    return (
        <div className='gtk_detail_container'>
          <div className='gtk_grid_address_container'>
              <AddressDelivery/>
          </div>
            <div className='gtk_grid_manager_container'>
                <ManagerCompany/>
            </div>
          <div className='gtk_grid_support_container'>
              <TechnicalSupport/>
          </div>
        </div>
    );
};

export default DetailContainer;