import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    Image: {
        type: String,
    }
})

// check at bottom of reamdme for models creation and assignment procss in the User variable
const User = models.User || new model("User",UserSchema);

export default User;