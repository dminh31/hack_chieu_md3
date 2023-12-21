import React from 'react'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Todo from './components/Todo'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/todo' element={<Todo />}></Route>
    </Routes>
    </div >
  )
}
