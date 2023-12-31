"use client"

import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();
  const [ providers, setProviders ] = useState(null);
  const [ toggleDropdown, setToggleDropDown ] = useState(false);

  useEffect(()=>{
    const fetchProviders = async() => {
      const response = await getProviders();

      setProviders(response);
    }
    fetchProviders();
  },[]); 
  console.log()
  return (
    <nav className='flex-between w-full mb-36 pt-12'>
      <Link href={'/'} className='flex gap-2 flex-center'>
        <Image 
          src={'/assets/images/logo.svg'}
          width={30}
          height={30}
          alt='Promptia Logo'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className= 'sm:flex hidden' >
      {session?.user?(
        <div className='flex gap-3 md:gap-5'>
          <Link href={'/create-prompt'} className='black_btn'>create Prompt
          </Link>
          <button onClick={signOut} className='outline_btn'>Sign Out</button>
          <Link href={'/profile'}>
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              alt='Profile Pic'
            />
          </Link>
        </div>
        
      ):(
        <>
          {
            providers&&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In
              </button>
            ))
          }
        </>
      )}
      </div>
      
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>  
          {
            session?.user?(
              <div className='flex'>
                  <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    onClick={() =>setToggleDropDown((prev) => !prev)}
                    className='rounded-md'
                    alt='profile_pic'
                  />
                  {
                    toggleDropdown&&(
                      <div className='dropdown'>
                        <Link 
                          href={'/profile'}
                          onClick={() =>setToggleDropDown(false)}
                          className='dropdown_link'
                        >
                          Profile
                        </Link>
                        <Link 
                          href={'/create-prompt'}
                          onClick={() =>setToggleDropDown(false)}
                          className='dropdown_link'
                        >
                          Create Prompt
                        </Link>
                        <button
                        type='button'
                        onClick={() => {
                          setToggleDropDown(pre => !pre)
                          signOut();
                        }}
                        className='w-full black_btn mt-5'
                        >
                          Sign Out
                        </button>
                      </div>
                    )
                  }
              </div>
            ):
            <>
              {
                providers&&
                Object.values(providers).map((provider) =>(
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          }
      </div>
    </nav>
  )
}

export default Nav