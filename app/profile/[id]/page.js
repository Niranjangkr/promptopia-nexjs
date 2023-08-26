'use client'

import { useState, useEffect } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const UserProfile = ({params}) => {
    const { data: session } = useSession()
    const [posts, setPost] = useState([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const name = searchParams.get('name')
    useEffect(() => {
        const fetchPosts = async() => {
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const prompts = await response.json();
            setPost(prompts)
        }
        if(session?.id){
          fetchPosts();
        }
    }, [session?.id])

    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async(post) => {
      const hasConfirmed = confirm("Are you sure you want to delete the Prompt ? ")
      if(hasConfirmed){
        try {
          await fetch(`api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          })

          const fileteredPost = posts.filter((p) => p._id != post._id)
          setPost(fileteredPost)
        } catch (error) {
          console.log(error)
        }
      }
    }

  return (
    <Profile 
        name={name}
        desc="Welcome to My Profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default UserProfile