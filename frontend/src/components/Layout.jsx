import React from 'react';
import '../styles/Layout.css'
import Header from './Header'

const Layout = ({children}) => {
    return (
        <div className="Layout">
            <Header/>
           
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;