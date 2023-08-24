'use client'

import { useState, useEffect } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router"

import Profile from "@components/Profile"

const handleEdit = () =>{

}

const handleDelete = async() => {

}

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPost] = useState([])
    useEffect(() => {
        const fetchPosts = async() => {
            const response = await fetch(`/api/users/${session?.id}/posts`)
            const prompts = await response.json();
            setPost(prompts)
        }
        if(session?.id){
          fetchPosts();
        }
    }, [session?.id])
  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized Profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile