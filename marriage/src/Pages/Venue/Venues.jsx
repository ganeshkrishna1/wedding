import React, { useEffect, useState } from 'react';
import './Venues.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../Components/Navbar/Navbar";

function Venues() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8081/getvenue')
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

  const handleAddToCart = (venue) => {
    // Extract required data from the venue object
    const { name, address, price } = venue;

    // Create a payload object with the required data
    const payload = { name, address, price };

    axios.post('http://localhost:8081/addtocart', payload)
      .then(res => {
        if (res.data.message === 'Success') {
          alert('Venue added to cart successfully!');
        } else {
          
          alert('Failed to add venue to cart.');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar/>
      <div className='body'>
        <div><br/></div>
        <div></div>
      </div>
      <div className="templateContainer">
        {data.length > 0 ? (
          data.map((val) => {
            return (
              <div className="template" key={val.id} id="adminVenueGrid">
                <div className="Container">
                  <img src={val.img1} alt="" />
                  <img src={val.img2} alt="" />
                  <img src={val.img3} alt="" />
                  <img src={val.img4} alt="" />
                  <p><b>Venue Name:  </b>   {val.name}</p>
                  <p><b>Venue Capacity  </b>  {val.capacity}</p>
                  <p><b>Address</b>  {val.address} </p>
                  <p><b>Price :</b>  {val.price}</p>
                  <button onClick={() => handleAddToCart(val)}  className="addButton">Add to Cart</button>
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

export default Venues;
