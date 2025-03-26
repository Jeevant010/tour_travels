import React from "react";
import Header from '../Components/Header.jsx' ;
import Footer from '../Components/Footer.jsx' ;

const Ourmain = 
    (Component) => 
    ({ ...props }) => {
        return (
            <div>
                <Header />
                <Component {...props} />
                <h1>Go Easy with the Best Platform of Tourism</h1>
                <Footer />
            </div>
        );
    };

export default Ourmain;