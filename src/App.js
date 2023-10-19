import React from 'react'

import './App.css';
import { ResearchTab } from './components/ResearchTab';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import { ResearchTab } from './components/ResearchTab';

function App() {
  return (
  <div className='main'>

{/*    
    <Routes>
    <Route path="/" exact component={TabPanel} />
        <Route path="/research" component={ResearchTab} />
    </Routes>
 */}
 <ResearchTab/>

 
  </div>
  )
}

export default App