const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const db = require('../data/db.json');
const fs = require('fs');
const path = require('path');

// Middleware to parse the request body
app.use(bodyParser.json());

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, '7vmXkJKvC7+q2RZ33F6Gf84Q27Fq+qe0o6KTQGxOJWc=', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  // Perform authentication logic here

  // Assuming authentication is successful, generate JWT token
  const token = jwt.sign({ username }, '7vmXkJKvC7+q2RZ33F6Gf84Q27Fq+qe0o6KTQGxOJWc=');

  // Return the token in the response
  res.json({ token });
});

// Get all addresses
app.get('/api/addresses', authenticateJWT, (req, res) => {
  const addresses = db.addresses;
  res.json(addresses);
});

// PUT request to update an address
app.put('/api/addresses/:id', authenticateJWT, (req, res) => {
  const addressId = req.params.id;
  const updatedAddress = req.body;

  // Find the address to update in the storage or database
  const addressToUpdate = db.addresses.find(address => address.id === addressId);
  if (!addressToUpdate) {
    return res.status(404).json({ error: 'Address not found' });
  }

  // Update the address details
  addressToUpdate.street = updatedAddress.street;
  addressToUpdate.city = updatedAddress.city;
  addressToUpdate.state = updatedAddress.state;
  addressToUpdate.zipcode = updatedAddress.zipcode;

  // Save the updated data back to the db.json file
  const dbPath = path.join(__dirname, 'data', 'db.json');
  fs.writeFile(dbPath, JSON.stringify(db, null, 2), err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update address' });
    }
    res.json({ message: 'Address updated successfully' });
  });
});

// DELETE request to delete an address
app.delete('/api/addresses/:id', authenticateJWT, (req, res) => {
  const addressId = req.params.id;

  // Find the index of the address to delete in the storage or database
  const addressIndex = db.addresses.findIndex(address => address.id === addressId);
  if (addressIndex === -1) {
    return res.status(404).json({ error: 'Address not found' });
  }

  // Remove the address from the addresses array
  db.addresses.splice(addressIndex, 1);

  // Save the updated data back to the db.json file
  const dbPath = path.join(__dirname, 'data', 'db.json');
  fs.writeFile(dbPath, JSON.stringify(db, null, 2), err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete address' });
    }
    res.json({ message: 'Address deleted successfully' });
  });
});




// Get all items
app.get('/api/items', authenticateJWT, (req, res) => {
  const items = db.items;
  res.json(items);
});

// Get all order statuses
app.get('/api/orderStatuses', authenticateJWT, (req, res) => {
  const orderStatuses = db.orderStatuses;
  res.json(orderStatuses);
});

// Get all orders
app.get('/api/orders', authenticateJWT, (req, res) => {
  const orders = db.orders;
  res.json(orders);
});

// Get all users
app.get('/api/users', authenticateJWT, (req, res) => {
  const users = db.users;
  res.json(users);
});

// Get all user types
app.get('/api/userTypes', authenticateJWT, (req, res) => {
  const userTypes = db.userTypes;
  res.json(userTypes);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
