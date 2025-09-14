import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
  loadingProgress: number
  loadingMessage: string
  hasError: boolean
  setChartLoading: (chartId: string, loading: boolean) => void
  setChartProgress: (chartId: string, progress: number) => void
  setChartMessage: (chartId: string, message: string) => void
  setChartError: (chartId: string, hasError: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("Initializing dashboard...")
  const [hasError, setHasError] = useState(false)
  const [chartStates, setChartStates] = useState<Record<string, { loading: boolean; progress: number; message: string; hasError: boolean }>>({})

  // Chart IDs for tracking
  const chartIds = ['year', 'relevance', 'sector', 'countries']

  const setChartLoading = (chartId: string, loading: boolean) => {
    setChartStates(prev => ({
      ...prev,
      [chartId]: {
        ...prev[chartId],
        loading,
        progress: loading ? 0 : 100,
        message: loading ? `Loading ${chartId} data...` : `${chartId} ready`,
        hasError: false
      }
    }))
  }

  const setChartProgress = (chartId: string, progress: number) => {
    setChartStates(prev => ({
      ...prev,
      [chartId]: {
        ...prev[chartId],
        progress: Math.max(0, Math.min(100, progress))
      }
    }))
  }

  const setChartMessage = (chartId: string, message: string) => {
    setChartStates(prev => ({
      ...prev,
      [chartId]: {
        ...prev[chartId],
        message
      }
    }))
  }

  const setChartError = (chartId: string, hasError: boolean) => {
    setChartStates(prev => ({
      ...prev,
      [chartId]: {
        ...prev[chartId],
        hasError,
        loading: false,
        progress: hasError ? 0 : 100,
        message: hasError ? "Error loading data" : `${chartId} ready`
      }
    }))
  }

  useEffect(() => {
    // Calculate overall loading state
    const loadingCharts = Object.values(chartStates).filter(state => state.loading)
    const errorCharts = Object.values(chartStates).filter(state => state.hasError)
    const allChartsLoaded = chartIds.every(id => chartStates[id]?.loading === false)
    
    if (errorCharts.length > 0) {
      // Show error state
      setIsLoading(false)
      setLoadingProgress(0)
      setLoadingMessage("Error loading data")
      setHasError(true)
      
      // Auto-dismiss error after 3 seconds
      const errorTimeout = setTimeout(() => {
        setHasError(false)
        setLoadingMessage("Dashboard ready!")
      }, 3000)
      
      return () => clearTimeout(errorTimeout)
    } else if (allChartsLoaded && chartIds.length > 0) {
      // All charts are loaded successfully
      setIsLoading(false)
      setLoadingProgress(100)
      setLoadingMessage("Dashboard ready!")
      setHasError(false)
    } else if (loadingCharts.length > 0) {
      // Some charts are still loading
      setIsLoading(true)
      setHasError(false)
      
      // Calculate average progress
      const totalProgress = Object.values(chartStates).reduce((sum, state) => sum + (state.progress || 0), 0)
      const averageProgress = totalProgress / chartIds.length
      setLoadingProgress(Math.round(averageProgress))
      
      // Show message from the first loading chart
      const firstLoadingChart = loadingCharts[0]
      setLoadingMessage(firstLoadingChart.message || "Loading data...")
    }
  }, [chartStates])

  useEffect(() => {
    // Set maximum loading time to 1 minute (60 seconds)
    const maxLoadingTime = 60000 // 60 seconds in milliseconds
    
    const timeoutId = setTimeout(() => {
      // Check if there are any errors before timing out
      const errorCharts = Object.values(chartStates).filter(state => state.hasError)
      if (errorCharts.length > 0) {
        setIsLoading(false)
        setLoadingProgress(0)
        setLoadingMessage("Error loading data")
        setHasError(true)
        
        // Auto-dismiss error after 3 seconds
        setTimeout(() => {
          setHasError(false)
          setLoadingMessage("Dashboard ready!")
        }, 3000)
      } else {
        setIsLoading(false)
        setLoadingProgress(100)
        setLoadingMessage("Dashboard ready!")
        setHasError(false)
      }
    }, maxLoadingTime)

    return () => clearTimeout(timeoutId)
  }, [chartStates])

  const value: LoadingContextType = {
    isLoading,
    loadingProgress,
    loadingMessage,
    hasError,
    setChartLoading,
    setChartProgress,
    setChartMessage,
    setChartError
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
