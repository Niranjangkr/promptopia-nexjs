import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
 // serverless --> Lambda functtion => means it opens up only when it gets called 
import User from "@models/user";
import { connectDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }){
            const sessionUser = await User.findOne({ email: session.user.email });
            session.id = sessionUser._id.toString(); 
            return session;
        },
        async signIn({ profile }){
            try {
                await connectDB();
                // check if user exist
                const UserExists = await User.findOne({email:profile.email});
             
                // if not create
                if(!UserExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        Image: profile.picture
                    })
                }
    
                return true;    
            } catch (error) {
                console.log(error);
                return false
            }
        }
    },
})

export { handler as GET, handler as POST}