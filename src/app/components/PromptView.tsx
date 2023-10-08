'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

declare global {
    interface Window{
        webkitSpeechRecognition: any
    }
}

interface PromptViewProps{
    username: string
    onEnter: (message: string) => void;
}

export default function PromptView(props: PromptViewProps){
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            props.onEnter(inputValue);
            setInputValue('');
          }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [inputValue, props.onEnter]);
    

    return <div className='flex flex-col pe-[205px] ps-[205px] justify-center gap-40 2xl:gap-80 h-screen w-full relative'>
        <p className='font-roboto text-[#A4C400] text-4xl'>Hello, {props.username}!</p>
        <form className='z-10'>
            <div className='flex items-center rounded-xl px-[20px] bg-[#161616] gap-2 focus-within:outline-[#5F5F5F] focus-within:outline-2 focus-within:outline'>
                <span>
                    <Image src='/search.svg'
                        alt='Search icon'
                        width={40}
                        height={40}
                        draggable='false'/> 
                </span>
                <input type='text' 
                    placeholder='Search...' 
                    className='outline-none border-none flex-grow bg-transparent text-[#D980FA] h-[80px]'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}/>
                <span>
                    <Image src='/mic.svg'
                        alt='Microphone icon'
                        width={40}
                        height={40}
                        draggable='false'/> 
                </span>
            </div>
        </form>
        <Image src='/nasa-logo.png'
        alt='Nasa Logo'
        width={334}
        height={93}
        draggable='false'/>
        <Image src='/hubbe-logo-gradient.png'
        alt='Hubbe Logo Gradient'
        className='absolute bottom-0 right-0 z-0'
        width={575}
        height={606}
        draggable='false'/>
    </div>
}