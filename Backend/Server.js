const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middelware/error.middelware');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Welcome to the Todo API');
});
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);


connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



