import { useState } from 'react'
import { ThemeProvider } from './components/provider/theme-provider'
import { ThemeToggle } from './components/theme-toggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='w-full h-full flex justify-center items-center'>
       
      <h1>Vite + React</h1>
      <ThemeToggle />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </div>
    </ThemeProvider>
  )
}

export default App
