import express, { Application } from 'express';
import userRouter from '../routes/userRouter';

const app: Application = express();

// Parsing incoming body as JSON
app.use(express.json());

// Routes
app.use('/users', userRouter);

const PORT =  8000;
app.listen(PORT, () => {
 console.log(`Server is up and running on port ${PORT}`);
});