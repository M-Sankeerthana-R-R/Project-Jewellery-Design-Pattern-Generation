const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/UserData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connection successful');
});
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  email: { type: String, unique: true, required: true },
  phone: String
});

const User = mongoose.model('User', userSchema);
app.get('/task1.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'task1.html'));
});
app.get('/task2.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'task2.html'));
});
app.post('/post', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });
    
    const user = await User.findOne({ username, password });
    
    if (user) {
      res.send('Login Successful');
    } else {
      res.send('Register yourself!!');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
});
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    console.log('Signup attempt:', { username, email, password, confirm_password }); 
    
    if (password !== confirm_password) {
      return res.send('Passwords do not match');
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.send('Username or email already exists');
    }
    const user = new User({
      username,
      password,
      email
    });
    await user.save();
    console.log('User saved:', user); 
    res.send('Signup Successful');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Server error');
  }
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
