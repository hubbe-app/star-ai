import Image from 'next/image'

export default function NameView(){
    return <div className="flex flex-col justify-center h-screen w-full bg-black">
        
        <Image className="self-center" src='/logo-hubbe.png' height={254} width={254} alt='logo hubbe'></Image>
        <form className="flex flex-col px-[370px] gap-10">
            <div>
                <label className="block mb-2 text-sm font-medium text-[#D980FA]">Name</label>
                <input type="text" id="name" className="widthbg-[#D980FA] text-[#D980FA] text-sm rounded-lg focus-within:outline-[#5F5F5F] focus-within:outline-2 focus-within:outline focus:border-[#D980FA] hover:border-[#D980FA] block w-full p-2.5 dark:bg-gray-700 dark:text-[#D980FA] dark:focus:border-[#D980FA]" required></input>
            </div>
            <button type="submit" className="self-center bg-gradient-to-r from-[#5BF677] to-[#AE61ED] px-[60px] py-[10px] hover:bg-none hover:bg-[#D980FA] focus:outline-none text-white font-medium rounded-lg text-sm">Enter</button>   
        </form> 
        <Image className="self-center py-20" src='/nasa-logo.png' width={334} height={93} alt='Nasa Logo'></Image>

    </div>
}