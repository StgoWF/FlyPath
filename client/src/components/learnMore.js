import React from 'react';
import { useNavigate } from 'react-router-dom';
import './learnMore.css';

const ButtonLink = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/learnMore');
  };

  return (
    <div className="learn-more-page">
      <h2>Learn More About Our Services</h2>
      <div className='row'>
      <div className='column'>
        <h3>About FLYPATH</h3>
        <p>FLYPATH's mission in to simplify the process of finding and booking plane tickets for travelers. Users can easily search for flights by entering key details such as their departure date, the number of passengers, destination, and preferred class of service. The application streamlines the search process, presenting users with available flight options that match their criteria, thereby enhancing the overall travel planning experience.</p>
        </div>
      <div className='column'>
        <h3>Key Features</h3>
        <li>User Input: Collects essential travel information such as departure date, number of passengers, destination, and travel class.</li>
        <li>Flight Serach: Queries available flights based on user input and displays relevant options.</li>
        <li>User-Friendly Interface: Simple and intuitive design to ensure ease of use.</li>
        </div>
        <div className='column'>
          <h3>Goals</h3>
          <li>Efficency: Reduce the time and effort required for users to find suitable flights.</li>
          <li>Convinence: Provide a seamless and hassle-free experience for booking plane tickets.</li>
          <li>Accessibility: Ensure application is easy to navigate for users of all technical skill levels.</li>
        </div>
    </div>
    </div>

  );
};

export default ButtonLink;