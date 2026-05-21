const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const petRoutes = require('./routes/petRoutes');
const requestRoutes = require('./routes/requestRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));
app.use('/pets', petRoutes);
app.use('/requests', requestRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Pet Adoption Server Running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});