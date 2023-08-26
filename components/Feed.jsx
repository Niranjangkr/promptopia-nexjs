'use client' 

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { useSearchParams } from 'next/navigation'

const PromptCardList = ({data, handleTagClick}) =>{

  return(
    <div className='mt-16 promp_layout'>
      {
        data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, SetSearchText ] = useState('');
  const [ posts, setPosts ] = useState([]);
  const [ filterdPrompts, setFilteredprompts ] = useState([]) // incase all data is already fetched and no pagination is used
  
  const handleSearchChange = (e) =>{
    SetSearchText(e.target.value)
    console.log(searchText)
     setFilteredprompts(filteredData(searchText)); // incase all data is already fetched and no pagination is used
  }

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();
      setPosts(data); 
    }
    fetchPosts();
  }, [])


  // make a api call only if the searched data is not present in the currently fetced data
  function filteredData(searchText){
      //find in already fetched data and 
      const regex = new RegExp(searchText, 'i')
      return posts.filter((post) => 
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
      )
  }  // for incase all data is already fetched and no pagination is used

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder='Search for tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={searchText?filterdPrompts:posts}    //{searchText?filterdPrompts:posts} //for in case where all the posts are fetched from the database and no pagination used
        handleTagClick={(searchTag) => SetSearchText(searchTag.split('#').join(''))}
      />
    </section>
  )
}

export default Feed