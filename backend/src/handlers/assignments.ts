import { Request, Response } from "express";
import { createAssignment } from "../models/assignments";


export async function createAssignmentHandler(request: Request, response: Response) {
    try {
        const { title, questions, description } = request.body;
        const userId = request.userId;

        const assignment = await createAssignment({
            title,
            questions,
            description,
            userId
        });

        console.log(`Created new assignment: ${title}`);
        
        return response.status(200).json(assignment);

    } catch (error) {
        console.log("Something went wrong creating an assignment:")
        console.log(error);
        return response.sendStatus(400);
    }
}