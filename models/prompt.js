import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema(({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        requried: [true, 'pompt is required'],  
    },
    tag: {
        type: String,
        required: [true, 'tag is required']
    }
}));

const Prompt = models.Prompt || new model("Prompt", PromptSchema);
export default Prompt