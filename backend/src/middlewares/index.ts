import { NextFunction, Request, Response } from 'express';

import { getUserBySessionToken } from '../models/users';

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const sessionToken = request.cookies['SESSION-COOKIE-KEY'];

        if (!sessionToken) {
            return response.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return response.sendStatus(403);
        }
        
        // Attach user id to request:
        request.userId = existingUser._id.toString();

        return next();
    } catch (error) {
        console.log("Something went wrong with authenticating (middleware)");
        console.log(error);
        return response.sendStatus(400);
    }
}