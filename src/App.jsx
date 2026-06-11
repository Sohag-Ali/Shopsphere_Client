
import { useEffect } from 'react';
import './App.css'

function App() {

useEffect(() => {

  const theme =
    localStorage.getItem("theme") ||
    "shopsphere";

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

}, []);
  return (
     <>
    
    </>
  )
}

export default App
