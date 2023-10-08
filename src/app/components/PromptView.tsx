'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

declare global {
    interface Window {
        webkitSpeechRecognition: any
    }
}

interface PromptViewProps {
    username: string
    onEnter: (message: string) => void;
}

export default function PromptView(props: PromptViewProps) {
    const [inputValue, setInputValue] = useState<string>('')
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [recordingComplete, setRecordingComplete] = useState<boolean>(false)
    const [transcript, setTranscript] = useState<string>('')

    const recognitionRef = useRef<any>(null)

    const startRecording = () => {
        setIsRecording(true)
        recognitionRef.current = new window.webkitSpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event: any) => {
            const { transcript } = event.results[event.results.length - 1][0]
            setTranscript(transcript)
            setInputValue(transcript)
        }

        recognitionRef.current.onerror = (event: any) => {
            console.log(`Error: ${event}`)
        }

        recognitionRef.current.start()
    }

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            setRecordingComplete(true)
        }
    }

    const handleToggleRecording = () => {
        setIsRecording(!isRecording)
        if (!isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
    }

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                props.onEnter(inputValue);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [inputValue, props.onEnter]);


    return <div className='flex flex-col pe-[205px] ps-[205px] justify-center gap-40 2xl:gap-80 h-screen w-full relative'>
        <p className='font-roboto text-[#A4C400] text-4xl'>Hello, {props.username}!</p>
        <div className='z-10 flex items-center rounded-xl px-[20px] bg-[#161616] gap-2 focus-within:outline-[#5F5F5F] focus-within:outline-2 focus-within:outline'>
            <span>
                <Image src='/search.svg'
                    alt='Search icon'
                    width={40}
                    height={40}
                    draggable='false' />
            </span>
            <input type='text'
                placeholder='Search...'
                className='outline-none border-none flex-grow bg-transparent text-[#D980FA] h-[80px]'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleToggleRecording}>
                {
                    isRecording ? (
                        <svg className='w-12 h-12' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#A4C400" d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z" />
                        </svg>
                    ) : (
                        <Image src='/mic.svg'
                            alt='Microphone icon'
                            width={40}
                            height={40}
                            draggable='false' />
                    )
                }
            </button>
        </div>
        <Image src='/nasa-logo.png'
            alt='Nasa Logo'
            width={334}
            height={93}
            draggable='false' />
        <Image src='/hubbe-logo-gradient.png'
            alt='Hubbe Logo Gradient'
            className='absolute bottom-0 right-0 z-0'
            width={575}
            height={606}
            draggable='false' />
    </div>
}