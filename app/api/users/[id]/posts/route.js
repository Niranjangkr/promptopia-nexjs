import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

export async function GET (request, { params }){
    try {
        await connectDB();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')
        
        return new Response(JSON.stringify(prompts), {status: 200 });
    } catch (error) {
        return new Response("Something went wrong, Try again", {status: 500});
    }
} 