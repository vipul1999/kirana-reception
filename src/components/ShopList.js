import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopInfo from './shopInfo/ShopInfo';
import './ShopList.css';

const ShopList = ({ selectedCategory }) => {
  const [shops, setShops] = useState([]);
  const fetchShopData = async () => {
    try {

      let url = `${process.env.REACT_APP_API_BASE_URL}/shops`;
      if (selectedCategory && selectedCategory.trim().length > 0) {
        url += `?category=${selectedCategory}`;
      } 
      console.log("Url generated is: "+url);
      const response = await axios.get(url);
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  };

  useEffect(() => {
    fetchShopData();
  }, [selectedCategory]);

  return (
    <div className="shop-list">
      {shops.map(shop => (
        <ShopInfo key={shop._id} shop={shop} fetchShopData={fetchShopData} />
      ))}
    </div>
    
  );
};

export default ShopList;
