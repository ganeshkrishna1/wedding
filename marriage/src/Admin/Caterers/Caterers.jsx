import React, { useEffect, useState } from 'react';
import './Caterers.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function Caterers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8081/getcaterer')
      .then(res => {
        if (res.data.Status === 'Success') {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = id => {
    axios
      .delete(`http://localhost:8081/deletecaterer/${id}`)
      .then(res => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
    <AdminNavbar/>
      <div className='body'>
        <div><br/></div>
        <div></div>
      </div>
      <div className="templateContainer">
        {data.length > 0 ? (
          data.map((val) => {
            return (
              <div className="template" key={val.id} id="adminCatererGrid">
                <div className="Container">
                  <img src={val.img1} alt="" />
                  <img src={val.img2} alt="" />
                  <img src={val.img3} alt="" />
                  <img src={val.img4} alt="" />
                  <p>caterer name  : {val.name}</p>
                  <p>Speciality : {val.speciality}</p>
                  <p>caterer address : {val.address} </p>
                  <p>caterer price : {val.price}</p>
                </div>
                <div className="buttonContainer">
                  <Link to={`/UpdateCaterer/${val.id}`} id="adminEditCaterer" className="editButton" type="button">
                    <FaEdit />
                  </Link>
                  <Link onClick={e => handleDelete(val.id)} id="adminDelete" className="deleteButton" type="button">
                    <FaTrash />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}

export default Caterers;
