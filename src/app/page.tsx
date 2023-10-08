'use client'
import { useState } from 'react'

import PromptView from './components/PromptView'
import ResponseView from './components/ResponseView';
import NameView from './components/NameView';

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');

  const handlePromptEnter = (message: string) => {
    setPrompt(message);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#010101]">
      <NameView></NameView>
      {/* { prompt ? (
        <ResponseView prompt={prompt}/>
      ) : (
        <PromptView username='Vitor' onEnter={handlePromptEnter}/>
      )} */}
    </main>
  )
}