import { createRoot } from 'react-dom/client'
import { Suspense, lazy, useState, useEffect, StrictMode } from 'react'
import './index.css'
import SplashLoader from './components/SplashLoader'
import ErrorBoundary from './components/ErrorBoundary'

const minimumSplashDurationMs = 2000

const App = lazy(() => import('./App'))

const AppWithSplash = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    console.log('AppWithSplash mounted, showing splash for', minimumSplashDurationMs, 'ms')

    const timer = setTimeout(() => {
      console.log('Splash duration completed, transitioning to main app')
      setShowSplash(false)
    }, minimumSplashDurationMs)

    return () => {
      console.log('AppWithSplash cleanup')
      clearTimeout(timer)
    }
  }, [])

  if (showSplash) {
    console.log('Rendering SplashLoader')
    return <SplashLoader />
  }

  console.log('Rendering main App')
  return (
    <Suspense fallback={<SplashLoader />}>
      <App />
    </Suspense>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppWithSplash />
    </ErrorBoundary>
  </StrictMode>
);
