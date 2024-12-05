const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
  next();
});


mongoose
  .connect('mongodb+srv://admin:admin@testing.id9ly.mongodb.net/studentsuccess?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

  const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';

  // User schema and model
  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Test the database communication
  app.get('/api/test-db', async (req, res) => {
    try {
      const users = await User.find();
      console.log('Database query successful:', users);
      res.status(200).json({ message: 'Database is communicating successfully', users });
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ message: 'Database query failed', error: err.message });
    }
  });
  
  // Routes
  app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ message: 'Sign in successful', token });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  // Handle invalid routes
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
