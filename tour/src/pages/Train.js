import React from 'react';
import Ourmain from '../hoc/Ourmain.jsx'
import PNRComponent from '../Components/PNRcomponent.jsx';
function Train(){
    return(
        <div className="container">
            <h1>Train</h1>
            <p>This is the Train page.</p>
            <p>Here you can find information about train services, schedules, and more.</p>

        <div>
           <PNRComponent />  
        </div>


        </div>
    );
}

export default Ourmain(Train);