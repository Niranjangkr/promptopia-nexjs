import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

export async function POST( req ) {
  const { userId, prompt, tag } = await req.json();
  
  try {
    await connectDB();
    const newPrompt = new Prompt({
        creator: userId,
        prompt,
        tag
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
    }catch (error) {
   return new Response("Failed to create a new Prompt",{status: 500});
  }
}