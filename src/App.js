
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/login/login';
import Contact from './pages/contact/contact';
import PrivateRoutes from './util/Protectiveroute';
import { SkeletonTheme } from 'react-loading-skeleton';
function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route element={<PrivateRoutes/>}>
          <Route path="/home" element={<Contact/>}></Route>
          </Route>
        </Routes>
        </BrowserRouter>
        </SkeletonTheme>
    </div>
  );
}

export default App;
