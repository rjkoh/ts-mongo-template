import { Request, Response } from "express";
import OpenAI from "openai";


// Routes Methods:
// POST "/api/generation"
export async function generateResponse(request: Request, response: Response) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_SECRET_KEY,
        });

        const userId = request.userId;

        if (!userId) {
            console.log("userId not found");
            return response.sendStatus(500);
        }

        // Main body
        const generatedResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "You will be provided with statements, and your task is to convert them to standard English."
              },
              {
                "role": "user",
                "content": "She no went to the market."
              }
            ],
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
        });

        const responseMessage = { 'message': generatedResponse.choices[0].message.content};

        return response.status(200).json(responseMessage)
    } catch (error) {
        console.log("Something went wrong getting all assignments:");
        console.log(error);
        return response.sendStatus(500);
    }
}
