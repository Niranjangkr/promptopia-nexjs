import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

// GET read

export async function GET(request, { params }){
    try {
        await connectDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt){
            return new Response('Prompt not found', {status: 404})
        }
        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (error) {
        return new Response("Something went cant get the prompt, try again", {status: 500})
    }
}

// PATCH to update

export async function PATCH(request, { params }){
    const { prompt, tag } = await request.json();
    try {
        await connectDB()
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt does not exist", { status: 404 })
        } 
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()
        return new Response( JSON.stringify(existingPrompt) ,{status:200})
    } catch (error) {
        return new Response("Something went wrong",{status: 500});
    }
}

// DELETE to delete 

export async function DELETE(request, { params }){
    try {
        await connectDB()
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Something went wrong cannot delete, try again", {status: 500})
    }
}