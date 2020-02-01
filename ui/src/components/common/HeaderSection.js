import React from 'react';
import './HeaderSection.css'
const HeaderSection = (props) => {
    return (
       <p className='gtk-header-section'>{props.children}</p>
    );
};

export default HeaderSection;