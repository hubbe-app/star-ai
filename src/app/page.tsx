import InputView from './components/InputView'
import RecordingView from './components/RecordingView'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#010101]">
      <InputView username='Vitor' />
    </main>
  )
}