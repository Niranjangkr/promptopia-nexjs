"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Form from '@components/Form'

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
    const [ submitting, setSubmitting ] = useState(false);
    const [ post, setPost ] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async(e) => {
      e.preventDefault();  
      setSubmitting(true);
      // console.log( "hii", session?.id)
      try {
          const response = await fetch('/api/prompt/new', { 
            method: 'POST',
            body: JSON.stringify({
              prompt: post.prompt,
              userId: session?.id,
              tag: post.tag
            })
          });
          if (response.ok || response.status == 201 ){
            router.push('/');
          }
        } catch (error) {
          console.log("something went wrong",error);
        }finally{
          setSubmitting(false); 
        }
    }
  return (
    <Form 
    type = 'Create'
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit = {createPrompt}
    />
  )
}

export default CreatePrompt