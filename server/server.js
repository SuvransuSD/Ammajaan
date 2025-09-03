const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
// Enable Cross-Origin Resource Sharing for your frontend to access the API
app.use(cors());

// This is the crucial part:
// Serve static files (like images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory "database" of products.
// In a real app, this would come from a database query.
// IMPORTANT: The `imageName` should match the actual filename in `public/images/`
const productsFromDB = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, imageName: 'headphones.jpg' },
  { id: 2, name: 'Smartwatch Series 8', price: 399.00, imageName: 'watch.jpg' },
  { id: 3, name: 'Mechanical Keyboard', price: 120.50, imageName: 'keyboard.jpg' },
  { id: 4, name: '4K Gaming Monitor', price: 599.99, imageName: 'monitor.jpg' },
  { id: 5, name: 'Ergonomic Mouse', price: 75.00, imageName: 'mouse.jpg' },
  { id: 6, name: 'USB-C Hub', price: 45.00, imageName: 'hub.jpg' },
];

// API endpoint to get all products
app.get('/api/products', (req, res) => {
  const productsWithFullUrls = productsFromDB.map(product => {
    return {
      ...product,
      // Construct the full URL for the image
      // This is what the frontend will receive
      imageUrl: `${req.protocol}://${req.get('host')}/images/${product.imageName}`
    };
  });
  res.json(productsWithFullUrls);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
  console.log(`🖼️  Images are served from the 'public/images' directory.`);
  console.log(`API endpoint for products available at http://localhost:${PORT}/api/products`);
});