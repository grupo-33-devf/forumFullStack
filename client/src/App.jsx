
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/Errorpage'
import Chat from './components/Chat'
import { AuthProvider } from "./context/authContext"

 function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav></Nav>,

      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/chat', element: <Chat /> },
    /*  { path: '/CreatePosts', element: <CreatePosts /> },
        { path: '/PostsProfile', element: <PostsProfile /> },
        { path: '/Profile', element: <Profile /> }, 
        { path: '/PostsComments', element: <PostsComments /> }, */
      ],
    }
  ])



  return (
    <>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </>

  )
}
export default App

