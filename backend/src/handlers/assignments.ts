import { Request, Response } from "express";
import { createAssignment, getAssignmentsForUser } from "../models/assignments";

// Routes Methods:
// GET "/api/assignments"
export async function getAllAssignmentsHandler(request: Request, response: Response) {
    try {
        const userId = request.userId;

        if (!userId) {
            console.log("userId not found");
            return response.sendStatus(500);
        }

        const assignments = await getAssignmentsForUser(userId);

        return response.status(200).json(assignments)
    } catch (error) {
        console.log("Something went wrong getting all assignments:");
        console.log(error);
        return response.sendStatus(500);
    }
}

// POST "/api/assignments"
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
        return response.sendStatus(500);
    }
}
