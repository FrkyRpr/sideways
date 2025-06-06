import axios from 'axios';
import { useState, useEffect } from 'react';

export const PriceListManager = () => {
  const [lists, setLists] = useState([]);
  const [archivedLists, setArchivedLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        // Fetch active lists
        const activeResponse = await axios.get('/api/lists');
        const activeLists = activeResponse.data.lists.map((item) => ({
          ...item,
          stock_available: Number(item.stock_available), // Convert to number
        }));
        setLists(activeLists);

        // Fetch archived lists
        const archivedResponse = await axios.get('/api/lists?only_trashed=1');
        const archivedLists = archivedResponse.data.lists.map((item) => ({
          ...item,
          stock_available: Number(item.stock_available), // Convert to number
        }));
        setArchivedLists(archivedLists);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const addProduct = async (productData) => {
    try {
      const response = await axios.post('/api/lists', productData);
      setLists((prev) => [...prev, {
        ...response.data,
        stock_available: Number(response.data.stock_available), // Convert to number
      }]);
    } catch (error) {
      setError(error.message);
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/lists/${id}`, updatedData);
      setLists((prev) =>
        prev.map((item) => (item.id === id ? {
          ...response.data.lists,
          stock_available: Number(response.data.lists.stock_available), // Convert to number
        } : item))
      );
    } catch (error) {
      setError(error.message);
      console.error('Error updating product:', error);
    }
  };

  const updateStock = async (id, stock) => {
    try {
      const response = await axios.patch(`/api/lists/${id}/stock`, { stock_available: stock });
      setLists((prev) =>
        prev.map((item) => (item.id === id ? {
          ...response.data.lists,
          stock_available: Number(response.data.lists.stock_available), // Convert to number
        } : item))
      );
    } catch (error) {
      setError(error.message);
      console.error('Error updating stock:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/lists/${id}`);
      setLists((prev) => prev.filter((item) => item.id !== id));
      const response = await axios.get('/api/lists?only_trashed=1');
      const archivedLists = response.data.lists.map((item) => ({
        ...item,
        stock_available: Number(item.stock_available), // Convert to number
      }));
      setArchivedLists(archivedLists);
    } catch (error) {
      setError(error.message);
      console.error('Error archiving product:', error);
    }
  };

  const restoreProduct = async (id) => {
    try {
      await axios.post(`/api/lists/${id}/restore`);
      setArchivedLists((prev) => prev.filter((item) => item.id !== id));
      const response = await axios.get('/api/lists');
      const activeLists = response.data.lists.map((item) => ({
        ...item,
        stock_available: Number(item.stock_available), // Convert to number
      }));
      setLists(activeLists);
    } catch (error) {
      setError(error.message);
      console.error('Error restoring product:', error);
    }
  };

  const forceDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/lists/${id}/force`);
      setArchivedLists((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
      console.error('Error permanently deleting product:', error);
    }
  };

  return { lists, archivedLists, error, addProduct, updateProduct, updateStock, deleteProduct, restoreProduct, forceDeleteProduct };
};