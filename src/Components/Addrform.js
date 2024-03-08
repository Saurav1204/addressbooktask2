import 'bootstrap/dist/css/bootstrap.css';
import '../css/Form.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Addrform = () => {
  const [FirstName, setfname] = useState('');
  const [LastName, setlname] = useState('');
  const [MiddleName, setmname] = useState('');
  const [Address, setaddress] = useState('');
  const [Contact, setcontact] = useState('');
  const [Email, setemail] = useState('');
  const [data, setdata] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data object
    const newData = {
      firstName: FirstName,
      lastName: LastName,
      middleName: MiddleName,
      address: Address,
      contact: Contact,
      email: Email,
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), // Indian time zone
      modifiedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) // Indian time zone

    };
        setfname('');
        setlname('');
        setmname('');
        setaddress('');
        setcontact('');
        setemail('');

    // Make a POST request to the fake API
    try {
      const response = await axios.post('http://192.168.1.14:3000/addressbook', newData);
      console.log(response.data); // Log the response from the API
      // Assuming the API returns the saved data, you can update state or perform other actions here
    } catch (error) {
      console.error('Error occurred while saving data:', error);
    }
  };


  return (
    <div>
      <h1>Address Book Form</h1>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" className="fname" value={FirstName} onChange={(e) => setfname(e.target.value)} />
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" className="lname" value={LastName} onChange={(e) => setlname(e.target.value)} />
          <label htmlFor="middlename">Middle Name</label>
          <input type="text" id="middlename" className="mname" value={MiddleName} onChange={(e) => setmname(e.target.value)} />
          <label htmlFor="address">Address</label>
          <input type="text" className="address" id="address" value={Address} onChange={(e) => setaddress(e.target.value)} />
          <label htmlFor="contact">Contact</label>
          <input type="number" className="contact" id="contact" value={Contact} onChange={(e) => setcontact(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="email" className="email" id="email" value={Email} onChange={(e) => setemail(e.target.value)} />
          <button type="submit" id='adddata' className="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Addrform;
