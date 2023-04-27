import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import AboutPAge from './pages/AboutPAge'
import { FeedbackProvider } from './context/FeedbackContext'
import AboutIconLink from './components/AboutIconLink'

function App(){
    //const [feedback, setFeedback] = useState(FeedbackData)

   
    return (
        <FeedbackProvider>
          <Router>
         {/* <Header bgColor="red" textColor="blue"/> if we delete it the default value 'll be displayed  */}
         <Header />
        <div className="container">
            <Routes>
               <Route exact path='/' element={
                <>
                <FeedbackForm />
                 <FeedbackStats />
                 <FeedbackList />
                </>
               }>
                 
                 </Route>
                <Route path='/about' element={<AboutPAge />}/>
             </Routes>
              <AboutIconLink />
            </div> 
            </Router>  
            </FeedbackProvider>
    )
}
export default App