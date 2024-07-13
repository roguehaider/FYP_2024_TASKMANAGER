import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    subTasks: [
      {
        title: String,
        date: Date,
        type: {
          type: String,
          default: "bug",
          enum: ["story", "epic", "bug"], // Ensure these match exactly
        },
        priority: {
          type: String,
          default: "normal",
          enum: ["high", "medium", "normal", "low"], // Ensure these match exactly
        },
        stage: {
          type: String,
          default: "todo",
          enum: ["todo", "inprogress", "completed"], // Ensure these match exactly
        },
      },
    ],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
