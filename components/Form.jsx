import React from 'react'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
   <div className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your amazing prompts with the world, and let your imagination run wild with AI-powered platform.
      </p>

      <form 
      onSubmit={handleSubmit}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
          <textarea
          value={post.prompt} 
            onChange={(e) => setPost({
              ...post,
              prompt: e.target.value
            })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          >
          </textarea>
        </label>

        <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Tag{`
          `}
          </span> <span className='font-normal'>(#product #webdevelopment #idea)</span>
          <textarea
          value={post.tag} 
            onChange={(e) => setPost({
              ...post,
              tag: e.target.value
            })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          >
          </textarea>
        </label>
      </form>
   </div>
  )
}

export default Form