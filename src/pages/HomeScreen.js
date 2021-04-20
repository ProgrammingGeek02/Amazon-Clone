import React, { useEffect, useState } from 'react'
import axios from 'axios';

/* Components */
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    
    const fetchData = async() =>{

      try {

        setLoading(true);

        const { data } = await axios.get('/api/product');

        setLoading(false);

        setProducts(data);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }   

    };

    fetchData();

  }, []);
  
    return (
        <>
        {loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
        (
          <div className="row center">
            {
              products.map(product => (
                <Product key={product._id} product={product} />
              ))
            }
                               
          </div>
        )}
        </>
    )
}