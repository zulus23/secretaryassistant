import React from 'react';
import './DetailContainer.css'
import TechnicalSupport from "./support/TechnicalSupport";

import ManagerCompany from "./manager/ManagerCompany";

const DetailContainer = () => {
    return (
        <div className='gtk_detail_container'>
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