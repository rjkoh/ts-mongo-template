import { Request, Response } from "express";
import crypto from 'crypto';
import { getUserByEmail, createUser } from "../models/users";


// Helper Functions:
const AUTH_SECRET = process.env.AUTH_SECRET || "default_secret";

const random = () => crypto.randomBytes(128).toString('base64');
const generateHash = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(AUTH_SECRET).digest('hex');
}


// Routes Methods:
// GET "/api/users"
export function getUsersHandler(request: Request, response: Response) {
    response.send([]);
}

// GET "/api/users/:id"
export function getUserByIdHandler(request: Request, response: Response) {
    response.send({});
}

// POST "/api/users"
export async function registerUserHandler(request: Request, response: Response) {
    try {
        const { email, username, password } = request.body;
        
        // Check request body:
        if (!email || !username || !password) {
            console.log("Missing email/username/password field(s) in request body")
            return response.sendStatus(400);
        }

        // Check existing user:
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            console.log("User with email already exists");
            return response.sendStatus(400);
        }

        // Register new user:
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: generateHash(salt, password)
            }
        });
        console.log(`Successfully registered user: ${username}`);

        return response.status(200).json(user);

    } catch (error) {
        console.log("Something went wrong with creating a new user:");
        console.log(error)
        return response.sendStatus(400);
    }
}

// POST "/api/users/login"
export async function loginUserHandler(request: Request, response: Response) {
    try {
        const { email, password } = request.body;

        // Check request body:
        if (!email || !password) {
            console.log("Missing email/password field(s) in request body");
            return response.sendStatus(400);
        }

        // Check existing user:
        const existingUser = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        
        if (!existingUser) {
            console.log(`User with email: ${email} does not exist`);
            return response.sendStatus(400);
        }

        // Compare password:
        const hashedGivenPassword = generateHash(existingUser.authentication.salt, password);
        
        if (hashedGivenPassword != existingUser.authentication.password) {
            console.log(`Wrong password for ${email}`);
            return response.sendStatus(403);
        }

        // Successful login, generate session token:
        console.log(`Successful login for ${email}`);
        const salt = random();
        existingUser.authentication.sessionToken = generateHash(salt, existingUser._id.toString());

        await existingUser.save();

        response.cookie('SESSION-COOKIE-KEY', existingUser.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return response.status(200).json(existingUser);
    } catch (error) {
        console.log("Something went wrong with logging in:");
        console.log(error);
        return response.sendStatus(400);
    }
}