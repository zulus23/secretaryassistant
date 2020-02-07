import React from 'react';
import './DetailContainer.css'
import TechnicalSupport from "./support/TechnicalSupport";

import ManagerCompany from "./manager/ManagerCompany";
import SearchResult from "./SearchResult";

const DetailContainer = () => {
    return (

        <div className='gtk-detail-container'>
            <div className='gtk-grid-result-container'>
                <SearchResult/>
            </div>
           <div className='gtk-grid-manager-container'>
                <ManagerCompany/>
            </div>
          <div className='gtk-grid-support-container'>
              <TechnicalSupport/>
          </div>
        </div>
    );
};

export default DetailContainer;