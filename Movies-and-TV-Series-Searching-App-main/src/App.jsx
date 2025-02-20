import React from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Trending from './Components/Trending';
import Movies from './Components/Movies';
import TVseries from './Components/TVseries';
import Search from './Components/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Trending/>
      }, 
      {
        path: "Movies",
        element: <Movies/>
      },
      {
        path: "TVseries",
        element: <TVseries/>
      },
      {
        path: "Search",
        element: <Search/>
      },
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
