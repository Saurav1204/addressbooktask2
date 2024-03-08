import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css'; // Import CSS for modal styles
import '../css/Modal.css'; // Import CSS for modal styles

const Addrlist = () => {
    const [data, setdata] = useState([]);
    const [editaddrData, setEditaddrData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resp = await axios.get('http://192.168.1.14:3000/addressbook');
            if (resp.status === 200) {
                setdata(resp.data);
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (err) {
            console.error('Error fetching data from API:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const resp = await axios.delete(`http://192.168.1.14:3000/addressbook/${id}`);
            if (resp.status === 200) {
                setdata(data.filter((addr) => addr.id !== id));
            }
        } catch (err) {
            console.error('Error deleting data:', err);
        }
    };

    const handleEditButtonClick = async (addr) => {
        await fetchPostDetails(addr.id);
        openModal();
        console.log("Modal opened");
    };
    
    const fetchPostDetails = async (addrid) => {
        try {
            const response = await axios.get(`http://192.168.1.14:3000/addressbook/${addrid}`);

            if (response.status === 200) {
                setEditaddrData(response.data);
            } else {
                throw new Error('Failed to fetch details');
            }
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    const editdata = async (addrid) => {
        try {
            const firstName = document.getElementById('firstname').value;
            const lastName = document.getElementById('lastname').value;
            const middleName = document.getElementById('middlename').value;
            const address = document.getElementById('address').value;
            const contact = document.getElementById('contact').value;
            const email = document.getElementById('email').value;
            const createdAt = editaddrData.createdAt;
            const modifiedAt = new Date().toISOString();
            const response = await axios.put(`http://192.168.1.14:3000/addressbook/${addrid}`, {
                firstName,
                lastName,
                middleName,
                address,
                contact,
                email,
                createdAt,
                modifiedAt
              

            });

            if (response.status === 200) {
                setEditaddrData({ firstName, lastName, middleName, address, contact, email,createdAt,modifiedAt });
                console.log('Edited successfully', response.data);
                setIsModalOpen(false); // Close modal after successful edit
                fetchData(); // Refetch data to update the list
                alert("Data edited successfully");
            } else {
                console.error('Failed to edit ', response.data);
                alert("Data could not be edited. Please try again.");
            }
        } catch (error) {
            console.error('Error editing ', error);
            alert("Error editing data. Please try again.");
        }
    };

    const openModal = () => {
        console.log("Opening modal");
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        editdata(editaddrData.id);
    };

    return (
        <div style={{
            textAlign: "center",
            display: "block",
            padding: 30,
            margin: "auto",
        }}>
            <h1>Address Book List</h1>
            <div className='tablecontainer'>
                <table id="contactDetailsTable">
                    {/* Table Header */}
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Middle Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>CreateAt</th>
                            <th>ModifyAt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {data.map((addr) => (
                            <tr key={addr.id}>
                                <td>{addr.firstName}</td>
                                <td>{addr.lastName}</td>
                                <td>{addr.middleName}</td>
                                <td>{addr.address}</td>
                                <td>{addr.contact}</td>
                                <td>{addr.email}</td>
                                <td>{addr.createdAt}</td>
                                <td>{addr.modifiedAt}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleEditButtonClick(addr)}>Edit Modal</button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(addr.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Edit Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h3 className='modalhead'>Update Form</h3>
                        </div>
                        <form id='editForm' onSubmit={handleSubmitEdit}>
                            {/* Populate form fields with editData */}
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname" className="firstName" value={editaddrData?.firstName || ''} onChange={(e) => setEditaddrData({ ...editaddrData, firstName: e.target.value })} />
                            <label htmlFor="lastname"> Last Name </label>
                            <input type="text" id="lastname" className="lastName" value={editaddrData?.lastName || ''} onChange={(e) => setEditaddrData({ ...editaddrData, lastName: e.target.value })} />
                            <label htmlFor="middlename"> Middle Name </label>
                            <input type="text" id="middlename" className="middleName" value={editaddrData?.middleName || ''} onChange={(e) => setEditaddrData({ ...editaddrData, middleName: e.target.value })} />
                            <label htmlFor="address"> Address </label>
                            <input type="text" className="address" id="address" value={editaddrData?.address || ''} onChange={(e) => setEditaddrData({ ...editaddrData, address: e.target.value })} />
                            <label htmlFor="contact"> Contact </label>
                            <input type="number" className="contact" id="contact" value={editaddrData?.contact || ''} onChange={(e) => setEditaddrData({ ...editaddrData, contact: e.target.value })} />
                            <label htmlFor="email"> Email </label>
                            <input type="email" className="email" id="email" value={editaddrData?.email || ''} onChange={(e) => setEditaddrData({ ...editaddrData, email: e.target.value })} />
                            <button type='submit' className='btn btn-danger'>Edit Data</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Addrlist;
