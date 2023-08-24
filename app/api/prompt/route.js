import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

export async function GET (request){
    try {
        await connectDB();
        const data = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(data), {status: 200 });  
    } catch (error) {
        console.log(error)
        new Response("Failed to fetch all Prompts", { status: 500 });
    }
}