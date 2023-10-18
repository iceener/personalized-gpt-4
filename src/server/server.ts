import express, {Request, Response} from 'express';
import {auth} from "../guards/guard.ts";
import {act} from "../app.ts";

// Initialize the server
const app = express();
app.use(express.json());
const port = 3000;

// Setup main route
app.post('/', auth, async (req: Request, res: Response) => {
    const response = await act(req.body.query);
    res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});