
import { Routes, Route } from "react-router-dom";
import './App.css'
import HeaderComponent from './components/header/Header.component'
import AboutComponent from "./components/about/About.component";
import TaskComponent from "./components/task/Task.component";
import FooterComponent from "./components/footer/footer.component";


function App() {

  return (
    <>
      <HeaderComponent />
      <AboutComponent />
      <TaskComponent />
      <FooterComponent />
      <Routes>
        <Route path="/" element={<TaskComponent />} />
        {/* Add more routes here if needed */}
      </Routes>
    </>
  )
}

export default App
