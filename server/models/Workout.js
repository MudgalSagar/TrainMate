import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    duration : {
        type : Number,
        required: true
    },
    category: {
        type: String,
        enum : ["Cardio" ,"Strength" , "Flexibility" , "Balance"],
        required: true
    },
    date : {
        type : Date,
        default : Date.now,
    },
});
const Workout = mongoose.models.Workout || mongoose.model("Workout", workoutSchema)

export default Workout;