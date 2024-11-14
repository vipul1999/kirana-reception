import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ShopInventory.css'; // Import the CSS file

const ShopInventory = () => {
  const { id } = useParams();  // Retrieve shop ID from URL
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch inventory data based on shop ID
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/shipInventory/${id}/inventory`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        const data = await response.json();
        setInventory(data.inventoryItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [id]);

  if (loading) return <p className="loading-message">Loading inventory...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="title">Inventory for Shop {id}</h2>
      {inventory.length === 0 ? (
        <p className="no-items-message">No items in inventory.</p>
      ) : (
        <div className="inventory-list">
          {inventory.map(item => (
            <div key={item.id} className="item-card">
              {/* Display product image */}
              <img 
                src={item.image ||"https://via.placeholder.com/350x350?text=default-shop"} 
                alt={item.name} 
                className="item-image" 
              />
              <h3 className="item-title">{item.name}</h3>
              <p className="item-quantity">{item.quantity} available</p>
              <p className="item-price">Price: ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopInventory;
