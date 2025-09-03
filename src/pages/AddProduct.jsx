import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../redux/features/productsSlice';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
      toast.error('Please fill in all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image); // Your backend must handle this 'image' field

    setStatus('loading');
    try {
      // .unwrap() will throw an error if the thunk is rejected
      await dispatch(addNewProduct(formData)).unwrap();
      navigate('/'); // Navigate home on success
    } catch (error) {
      toast.error(`Failed to add product: ${error}`);
      setStatus('idle');
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add a New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <div className="mt-1 flex items-center space-x-6">
            <div className="shrink-0">
              {preview ? (
                <img className="h-24 w-24 object-cover rounded-md" src={preview} alt="Product preview" />
              ) : (
                <div className="h-24 w-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">Preview</div>
              )}
            </div>
            <input 
              type="file" 
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;