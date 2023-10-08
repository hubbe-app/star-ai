'use client'
import { useState } from 'react'

import PromptView from './components/PromptView'
import ResponseView from './components/ResponseView';
import NameView from './components/NameView';

export default function Home() {
  const [username, setUsername] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')

  const handlePromptEnter = (message: string) => {
    setPrompt(message);
  };

  const handleNameSubmit = (name: string) => {
    setUsername(name);
  };

  const handleBackClick = () => {
    setPrompt('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#010101]">
      {
        username ? (
          prompt ? (
            <ResponseView prompt={prompt} onBackClick={handleBackClick}/>
          ) : (
            <PromptView username={username} onEnter={handlePromptEnter}/>
          )
        ) :
        <NameView onSubmit={handleNameSubmit} />
      }
    </main>
  )
}