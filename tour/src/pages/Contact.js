import React from 'react';
import './Contact.css';
import Ourmain from '../hoc/Ourmain';

const Contact = () => {
  return (
	<div>
	  <h1>Contact Us</h1>
	  <p>This is the contact page.</p>
	</div>
  );
};


export default Ourmain(Contact);