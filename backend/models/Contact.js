import mongoose from "mongoose";

// const ContactSchema = new mongoose.Schema({
//   name: String,
//   email:String,
//   message:String
// });
const tournamentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
  })

const User = db.model("Tournament", tournamentSchema); 
