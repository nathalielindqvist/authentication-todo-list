import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/RegisterPage';
import MyList from './screens/MyList/MyList';
import CreateTask from './screens/CreateTask/CreateTask';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Header />
      <main>
        <Routes>
        <Route path='/' element={<LandingPage />} exact/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/mylist' element={<MyList />} />
        <Route path='/addtask' element={<CreateTask />} />
        </Routes>
      </main>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
