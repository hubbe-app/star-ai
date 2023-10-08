import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getBrainQuery } from '@/services/BrainService'

interface ResponseViewProps{
    prompt: string
    onBackClick: () => void
}

export default function ResponseView(props: ResponseViewProps){
    const [result, setResult] = useState<string>('')

    useEffect(() => {
        async function fetchBrainQuery() {
          try {
            const brainResult = await getBrainQuery(props.prompt);
            setResult(brainResult.result);
          } catch (error) {
            console.error('Erro fetching data:', error);
          }
        }
    
        fetchBrainQuery();
      }, []);


    const handleBackClick = () => {
        props.onBackClick()
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
                    value={props.prompt}
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
            {result}
        </div>
        <div className='flex justify-between items-center py-4'>
            <Image src='/hubbe-logo.png'
            alt='Hubbe Logo Gradient'
            width={65}
            height={65}
            draggable='false'/>
            <div className='flex gap-4'>
                <button className='flex justify-center items-center rounded-full bg-[#161616] w-[60px] h-[60px] hover:bg-[#252525]'>
                    <Image src='/left-arrow.svg'
                        alt='Left icon'
                        width={48}
                        height={48}
                        draggable='false'/>
                </button>
                <button>
                <button className='flex justify-center items-center rounded-full bg-[#161616] w-[60px] h-[60px] hover:bg-[#252525]'>
                    <Image src='/mic.svg'
                        alt='Microphone icon'
                        width={48}
                        height={48}
                        draggable='false'/>
                </button>
                </button>
                <button className='flex justify-center items-center rounded-full bg-[#161616] w-[60px] h-[60px] hover:bg-[#252525]'>
                    <Image src='/right-arrow.svg'
                        alt='Right icon'
                        width={48}
                        height={48}
                        draggable='false'/>
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