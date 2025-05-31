import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Join, Chat } from "./pages"


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join/>} />
      <Route path="/chat" element = {<Chat/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App