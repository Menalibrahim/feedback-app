//import {v4 as uuidv4} from 'uuid'
import { createContext, useState , useEffect} from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
const [feedback, setFeedback] = useState([])
useEffect(() => {
    fetchFeedback()
}, [])

//Fetch feedback
const fetchFeedback = async () => {
    // const response = await fetch(
    //   `http://localhost:5000/feedback?_sort=id&_order=desc`
    // ) before we add proxy in package.jason
    const response = await fetch(
        `/feedback?_sort=id&_order=desc`
        )
    const data = await response.json()
    
    setFeedback(data)
    isLoading(false)
}
    //was  inside the usestate using storing datas now in'll use backed stored datas { 
    //     id:1,
    //     text:'This is feedback item 1',
    //     rating:10

    // },
    // { 
    //     id:2,
    //     text:'This is feedback item 2',
    //     rating:9

    // },
    // { 
    //     id:3,
    //     text:'This is feedback item 3',
    //     rating:7

    // }
//])

//delete feedback
const deleteFeedback = async (id) =>{
    if(window.confirm('Are you sure you want to delete?')){
     await fetch(`/feedback/${id}`, {method: 'DELETE'})

      setFeedback(feedback.filter((item) => item.id !==id))
    }
 }
 
 //add feedback
 const addFeedback = async (newFeedback) => {
    //make a response to backend
  const response = await fetch ('/feedback', {
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
     body: JSON.stringify(newFeedback),
  })
     const data = await response.json()

    //newFeedback.id = uuidv4()
    setFeedback([data, ...feedback])
}

const[feedbackEdit,setFeedbackEdit] = useState({
    item:{},
    edit: false 
})
// set item to be updated
const editFeedback = (item) =>{
    setFeedbackEdit({
        item,
        edit:true
    })
}
//update feedback item
const updateFeedback = async (id, updItem) =>{
     const response = await fetch(`/feedback/${id}` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updItem)
     })

     const data = await response.json()
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...data} : item))
)}


    return <FeedbackContext.Provider value={{
      feedback,
      feedbackEdit,
      isLoading,
      deleteFeedback,
      addFeedback,
      editFeedback,
      updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>

}
export default FeedbackContext