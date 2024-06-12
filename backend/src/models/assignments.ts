import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: { type: [String], required: true },
    questionType: { type: String, enum: ["MCQ", "Open Ended"], required: true },
    answer: {type: String, required: true},
    marks: { type: Number, required: true }
});

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true },
    userId: {type: String, required: true}
});

export const AssignmentModel = mongoose.model('Assignment', AssignmentSchema);

// Helper functions:
export const getAssignments = () => AssignmentModel.find();
export const getAssignmentById = (id: string) => AssignmentModel.findById(id);
export const createAssignment = (values: Record<string, any>) => new AssignmentModel(values).save().then((assignment) => assignment.toObject());
export const deleteAssignmentById = (id: string) => AssignmentModel.findOneAndDelete({ _id: id });
export const updateAssignmentById = (id: string, values: Record<string, any>) => AssignmentModel.findByIdAndUpdate(id, values);
