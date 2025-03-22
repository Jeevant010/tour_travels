import React from "react";
import Header from '../Components/Header.jsx' ;
import Footer from '../Components/Footer.jsx' ;

const Ourmain = 
    (Component) => 
    ({ ...props }) => {
        return (
            <div>
                <Header />
                <h1>Deepesh header bana</h1>
                <Component {...props} />
                <h1>Abhisekh footer bana</h1>
                
                <Footer />
            </div>
        );
    };

export default Ourmain;