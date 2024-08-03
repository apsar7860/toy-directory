import express from 'express';
import toyRouter from './controllers/toyController';
import userRouter from './controllers/userControllers';

const app = express();
const port = 3000;

app.use(express.json());

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Toy Directory API!');
});

// Use toy and user routers
app.use('/toys', toyRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
