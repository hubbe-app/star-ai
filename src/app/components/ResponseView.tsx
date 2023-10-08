import Image from 'next/image'

interface ResponseViewProps{
    prompt: string;
}

export default function ResponseView(props: ResponseViewProps){
    return <div className='flex flex-col pe-[50px] ps-[50px] justify-center h-screen w-full relative'>
        <form>
            <div className='flex items-center px-[20px] bg-[#161616] border-b border-[#899294] gap-2'>
                <span>
                    <Image src='/back.svg'
                        alt='Back icon'
                        width={48}
                        height={48}
                        draggable='false'/> 
                </span>
                <input type='text' 
                    placeholder='Search...' 
                    className='font-["Source_Code_Pro"] outline-none border-none flex-grow bg-transparent text-[#A4C400] h-[80px]'
                    value={props.prompt}
                    readOnly/>
                <span>
                    <Image src='/close.svg'
                        alt='Close icon'
                        width={48}
                        height={48}
                        draggable='false'/> 
                </span>
            </div>
        </form>
        <div className='grow p-20 bg-[#161616] font-["Source_Code_Pro"] text-[#A4C400]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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