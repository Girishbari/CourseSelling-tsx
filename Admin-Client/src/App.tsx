
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Appbar from './components/Appbar';
import UpdateCourse from './components/UpdateCourse';
// import { sideBarStateStatus } from './store/selectors';



function App() {
  // const sidebar = useRecoilValue(sideBarStateStatus)

  return (

    <div style={{
      background: '#FBEAEB',
      height: '100%',
      position: 'relative'
    }}>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<CreateCourse />} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="/updatecourse" element={<UpdateCourse />} />s
        </Routes>
      </Router>

    </div>
  );
}

export default App;