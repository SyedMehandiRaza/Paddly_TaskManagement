import AllTask from "./pages/AllTask"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ImportantTask from "./pages/ImportantTask"
import CompletedTask from "./pages/CompletedTask"
import IncompletedTask from "./pages/IncompletedTask"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

const App = () => {
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}>
            <Route index element={<AllTask/>}/>
            <Route path="/importantTasks" element={<ImportantTask/>}/>
            <Route path="/completedTasks" element={<CompletedTask/>}/>
            <Route path="/incompletedTasks" element={<IncompletedTask/>}/>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
