import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { BrainQuery, getBrainQuery } from '@/services/BrainService'
import LoadingStarField from './LoadingStarField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface ResponseViewProps{
    prompt: string
    onBackClick: () => void
}

export default function ResponseView(props: ResponseViewProps){
    const [result, setResult] = useState<BrainQuery | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPostion, setCurrentPosition] = useState<number>(-1)
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [recordingComplete, setRecordingComplete] = useState<boolean>(false)
    const [transcript, setTranscript] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')

    const recognitionRef = useRef<any>(null)

    const startRecording = () => {
        setIsRecording(true)
        recognitionRef.current = new window.webkitSpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event:any) => {
            const { transcript } = event.results[event.results.length - 1][0]
            setTranscript(transcript)
            setInputValue(transcript)
        }

        recognitionRef.current.onerror = (event:any) =>{
            console.log(`Error: ${event}`)
        }

        recognitionRef.current.start()
    }

    useEffect(() => {
        setInputValue(props.prompt);
      }, [props.prompt]);

    useEffect(() => {
        return () => {
            if(recognitionRef.current){
                recognitionRef.current.stop()
            }
        }
    }, [])

    const stopRecording = () => {
        if(recognitionRef.current){
            setCurrentPosition(-1)
            setIsLoading(true)
            setResult(undefined)
            recognitionRef.current.stop()
            setRecordingComplete(true)
            setTimeout(async () => {
                const brainResult = await getBrainQuery(inputValue);
                setResult(brainResult);
                setIsLoading(false)
            }, 3000);
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

    useEffect(() => {

        console.log('Entrou')
        async function fetchBrainQuery() {
          try {
            setIsLoading(true)
            // setTimeout(async () => {
            //     const brainResult = await getBrainQuery(props.prompt);
            //     setResult(brainResult);
            //     setIsLoading(false)
            // }, 3000);
            const brainResult = await getBrainQuery(props.prompt)
            setResult(brainResult)
            setIsLoading(false)
          } catch (error) {
            console.error('Erro fetching data:', error);
          }
        }
    
        fetchBrainQuery();
      }, []);


    const handleBackClick = () => {
        props.onBackClick()
    }

    function nextSource(){
        if (result && currentPostion < result.Sources.length - 1) {
            setCurrentPosition(currentPostion + 1);
        }
    }

    function backSource(){
        if (currentPostion > -1) {
            setCurrentPosition(currentPostion - 1);
        }
    }

    return <div className='flex flex-col pe-[50px] ps-[50px] justify-center h-screen w-full relative'>
        <form>
            <div className='flex items-center px-[20px] bg-[#161616] border-b border-[#899294] gap-2'>
                <span className='cursor-pointer'>
                    <Image src='/back.svg'
                        alt='Back icon'
                        width={48}
                        height={48}
                        draggable='false'
                        onClick={handleBackClick}/> 
                </span>
                <input type='text' 
                    placeholder='Search...' 
                    className='font-["Source_Code_Pro"] outline-none border-none flex-grow bg-transparent text-[#A4C400] h-[80px]'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    readOnly/>
                <span className='cursor-pointer'>
                    <Image src='/close.svg'
                        alt='Close icon'
                        width={48}
                        height={48}
                        draggable='false'
                        onClick={handleBackClick}/> 
                </span>
            </div>
        </form>
        <div className='overflow-auto grow p-20 bg-[#161616] font-["Source_Code_Pro"] text-[#A4C400]'>
            {
                isLoading ? (
                    <LoadingStarField />
                ) : (
                    currentPostion == -1 ? result?.Answer : (
                        <div>
                            <h2>Source {currentPostion + 1}:</h2>
                            <p>File: {result?.Sources[currentPostion][0]}</p>
                            <p>Reference: {result?.Sources[currentPostion][1]}</p>
                        </div>  
                    )
                )}
        </div>
        <div className='flex justify-between items-center py-4'>
            <Image src='/hubbe-logo.png'
            alt='Hubbe Logo Gradient'
            width={65}
            height={65}
            draggable='false'/>
            <div className='flex gap-4'>
                <button className='flex justify-center items-center rounded-full bg-[#161616] w-[60px] h-[60px] hover:bg-[#252525] disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={backSource}
                disabled={currentPostion == -1 ? true : false}>
                    <FontAwesomeIcon icon={faChevronLeft} size='2x' color='#AE61ED'/>
                </button>
                <button onClick={handleToggleRecording} 
                className='flex justify-center items-center rounded-full bg-[#161616] w-[60px] h-[60px] hover:bg-[#252525]'>
                {
                    isRecording ? (
                        <svg className='w-12 h-12' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#A4C400" d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z"/>
                        </svg>
                    ) : ( 
                    <Image src='/mic.svg'
                    alt='Microphone icon'
                    width={40}
                    height={40}
                    draggable='false'/> 
                    )
                }
                </button>
                <button onClick={nextSource}
                    className='flex justify-center items-center rounded-full bg-[#161616] w-[60px] h-[60px] hover:bg-[#252525] disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={result && result.Sources && currentPostion == result.Sources.length - 1 ? true : false}>
                    <FontAwesomeIcon icon={faChevronRight} size='2x' color='#AE61ED'/>
                </button>
            </div>
            <Image src='/nasa-logo.png'
                alt='Nasa Logo'
                width={131}
                height={38}
                draggable='false'
                className='h-[38px]'/>
        </div>
    </div>
}