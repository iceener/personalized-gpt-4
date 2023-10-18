import type {NextFunction, Request, Response} from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}