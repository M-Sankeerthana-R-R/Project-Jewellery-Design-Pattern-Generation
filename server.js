const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/usersData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connection successful');
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: String
});

const User = mongoose.model('User', userSchema);

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'task1.html'));
});

// Serve the signup page
app.get('/task2.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'task2.html'));
});

// Handle login form submission
app.post('/post', async (req, res) => {
  const { name, pwd } = req.body;
  const user = new User({
    username: name,
    password: pwd
  });
  await user.save();
  console.log(user);
  res.send('Login form submission successful');
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
  const { username, email, phone, pwd } = req.body;
  const user = new User({
    username,
    password: pwd,
    email,
    phone
  });
  await user.save();
  console.log(user);
  res.send('Signup form submission successful');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
