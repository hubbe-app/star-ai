'use client'
import { useState, useRef, useEffect } from 'react'

declare global {
    interface Window{
        webkitSpeechRecognition: any
    }
}

export default function RecordingView(){
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [recordingComplete, setRecordingComplete] = useState<boolean>(false)
    const [transcript, setTranscript] = useState<string>('')

    const recognitionRef = useRef<any>(null)

    const startRecording = () => {
        setIsRecording(true)
        recognitionRef.current = new window.webkitSpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event:any) => {
            const { transcript } = event.results[event.results.length - 1][0]
            setTranscript(transcript)
        }

        recognitionRef.current.onerror = (event:any) =>{
            console.log(`Error: ${event}`)
        }

        recognitionRef.current.start()
    }

    useEffect(() => {
        return () => {
            if(recognitionRef.current){
                recognitionRef.current.stop()
            }
        }
    }, [])

    const stopRecording = () => {
        if(recognitionRef.current){
            recognitionRef.current.stop()
            setRecordingComplete(true)
        }
    }

    const handleToggleRecording = () => {
        setIsRecording(!isRecording)
        if (!isRecording){
            startRecording()
        } else {
            stopRecording()
        }
    }

    return <div className="flex items-center justify-center h-screen w-full">
        
        <div className='w-full'>
            {(isRecording || transcript) && (
                <div className='w-1/4 m-auto rounded-md border p-4 bg-white'>
                    <div className='flex-1 flex w-full justify-between'>
                        <div className='space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                                { recordingComplete ? "Recorded" : "Recording" }
                            </p>
                            <p className='text-sm text-muted-foreground'>
                            { recordingComplete ? "Thanks for talking" : "Start speaking..." }
                            </p>
                        </div>

                        { isRecording && (
                            <div className='rounded-full w-4 h-4 bg-red-400 animate-pulse' />
                        )}
                    </div>

                {transcript && (
                    <div className='border rounded-md p-2 h-fullm mt-4'>
                        <p className='mb-0'>{transcript}</p>
                    </div>
                )}    
                </div>
            )}
            
            <div className='flex items-center w-full'>
            {isRecording ? (
                <button onClick={handleToggleRecording}
                        className='rounded-full w-20 h-20 mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500'>
                    <svg className='w-12 h-12' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z"/>
                    </svg>
                </button>
            ) : (
                <button onClick={handleToggleRecording}
                    className='rounded-full w-20 h-20 mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500'>
                    <svg className='w-12 h-12' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16q2.075 0 3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21h-2Z"/>
                    </svg>
                </button> 
            )}
            </div>
        </div>
    </div>
}