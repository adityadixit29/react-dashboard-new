import Countries from '../../components/countries/Countries'
import Relevance from '../../components/relevance/Relevance'
import SectorGraph from '../../components/sector/SectorGraph'
import TopBox from '../../components/topBox/TopBox'
import Year from '../../components/year/Year'
import "./home.scss"
const Home = () => {
  return (
    // home class for the charts 
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
  )
}

export default Home     