const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3020;

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
  email_id:String,
  phone:String,
  password: String, 
  confirm_pwd:String
});

const User = mongoose.model('User', userSchema);

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'task2.html'));
});

// Handle form submission
app.post('/Post', async (req, res) => {
  const { name, pwd } = req.body;
  const user = new User({
    username: name,
    email_id:email,
    phone:phone,
    password: pwd,
    confirm_pwd:cpwd
  });
  await user.save();
  console.log(user);
  res.send('Signup successful');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
