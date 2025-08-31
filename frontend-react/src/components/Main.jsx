import React from 'react'
import Button from './Button.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const main = (props) => {
  return (
    <>
    <div className="container ">
        <div className='text-center p-5 rounded bg-light-dark'>
            <h2 className='text-light'>Stock Prediction App</h2>
            <p className='text-light'>The Document Object Model (DOM) in JavaScript is a programming interface that represents the structure of a web document as a tree of objects, allowing developers to access and manipulate HTML elements and their content dynamically. It enables actions like changing the document structure, style, and content using JavaScript methods.</p>
            <Button text="Login" class="btn-info"/>
        </div>
    </div>
    </>
  )
}

export default main