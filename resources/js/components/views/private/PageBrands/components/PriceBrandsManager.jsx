import axios from 'axios';
import { useState, useEffect } from 'react';

export const PriceBrandsManager = () => {
  const [brands, setBrands] = useState([]);
  const [archivedBrands, setArchivedBrands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // Fetch active brands
        const activeResponse = await axios.get('/api/brands');
        setBrands(activeResponse.data.brands);

        // Fetch archived brands
        const archivedResponse = await axios.get('/api/brands?only_trashed=1');
        setArchivedBrands(archivedResponse.data.brands);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const addBrand = async (brandData) => {
    try {
      const response = await axios.post('/api/brands', brandData);
      setBrands((prev) => [...prev, response.data]);
    } catch (error) {
      setError(error.message);
      console.error('Error adding brand:', error);
    }
  };

  const updateBrand = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/brands/${id}`, updatedData);
      setBrands((prev) =>
        prev.map((item) => (item.id === id ? response.data.brands : item))
      );
    } catch (error) {
      setError(error.message);
      console.error('Error updating brand:', error);
    }
  };

  const deleteBrand = async (id) => {
    try {
      await axios.delete(`/api/brands/${id}`);
      setBrands((prev) => prev.filter((item) => item.id !== id));
      const response = await axios.get('/api/brands?only_trashed=1');
      setArchivedBrands(response.data.brands);
    } catch (error) {
      setError(error.message);
      console.error('Error archiving brand:', error);
    }
  };

  const restoreBrand = async (id) => {
    try {
      await axios.post(`/api/brands/${id}/restore`);
      setArchivedBrands((prev) => prev.filter((item) => item.id !== id));
      const response = await axios.get('/api/brands');
      setBrands(response.data.brands);
    } catch (error) {
      setError(error.message);
      console.error('Error restoring brand:', error);
    }
  };

  const forceDeleteBrand = async (id) => {
    try {
      await axios.delete(`/api/brands/${id}/force`);
      setArchivedBrands((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
      console.error('Error permanently deleting brand:', error);
    }
  };

  return { brands, archivedBrands, error, addBrand, updateBrand, deleteBrand, restoreBrand, forceDeleteBrand };
};