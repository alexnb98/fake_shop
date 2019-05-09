const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/company', require('./routes/api/company'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/order', require('./routes/api/order'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
