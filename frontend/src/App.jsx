import Navbar from "./Components/Navbar"
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Jobs from "./Components/Jobs"





const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  }

])




const App = ()=>{


  return (
      <div>
        <RouterProvider router={appRouter} />
      </div>
  )
}

export default App