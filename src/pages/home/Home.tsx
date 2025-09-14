import Countries from '../../components/countries/Countries'
import Relevance from '../../components/relevance/Relevance'
import SectorGraph from '../../components/sector/SectorGraph'
import TopBox from '../../components/topBox/TopBox'
import Year from '../../components/year/Year'
import { useLoading } from '../../contexts/LoadingContext'
import "./home.scss"

const Home = () => {
  const { isLoading, loadingProgress, loadingMessage, hasError } = useLoading()

  return (
    <div className='home-page'>
      {/* Loading Toast */}
      {(isLoading || hasError) && (
        <div className={`loading-toast ${hasError ? 'error-toast' : ''}`}>
          <div className="toast-content">
            <div className="toast-spinner">
              <div className={`spinner ${hasError ? 'error-spinner' : ''}`}></div>
            </div>
            <div className="toast-text">
              <span className={`toast-title ${hasError ? 'error-title' : ''}`}>{loadingMessage}</span>
              {!hasError && (
                <div className="toast-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{Math.round(loadingProgress)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Professional heading */}
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Welcome back, Aditya! Here's what's happening with your data.</p>
      </div>
      
      {/* home class for the charts */}
      <div className='home'>
        {/* topbox containing dummy names */}
        <div className="box box1"><TopBox/></div>
        {/* Year graph with year filter */}
        <div className="box box2"><Year/></div>
        {/* relevance graph */}
        <div className="box box3"><Relevance/></div>
        {/* sector graph  */}
        <div className="box box5"><SectorGraph/></div>
        {/* countries graph  */}
        <div className="box box6"><Countries/></div>
      </div>
    </div>
  )
}

export default Home     