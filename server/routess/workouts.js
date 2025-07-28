import express from "express";
import Workout from "../models/Workout.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 }); 
    res.json(workouts);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/workout", async (req, res) => {
  try {
    const { name, duration , category } = req.body;

    if (!name || !duration || !category) {
      return res.status(400).json({ message: "Bad request" });
    }

    const newWorkout = new Workout({ name, duration , category});
    const savedWorkout = await newWorkout.save();

    res.status(201).json(savedWorkout);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req,res) => {
  try{
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if(!workout) {
      res.status(400).json({message: "Bad Request No workout found "})
    } else {
      res.status(200).json({message: "workout deleted"})
    }
  } 
  catch(err) {
    res.status(500).json({message: "error while doing it "})
  }
})

router.put("/:id", async(req,res) => {
  const {id} = req.params;
  const {name,duration , category} = req.body;
  if(!name || !duration || !category) {
    res.status(400).json({message: "The name and duration is not present or not "})
  }
  
  try {
    const UpdatedWorkout = await  Workout.findByIdAndUpdate(id, {name,duration,category}, {new: true})
    if(!UpdatedWorkout) {
      res.status(404).json({message: "no data found"})
    } 
    res.json(UpdatedWorkout)
  } catch {
    res.status(500).json({message: "Error occur"})
  }
})

export default router;
