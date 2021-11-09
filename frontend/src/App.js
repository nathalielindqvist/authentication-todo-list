import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/RegisterPage';
import MyList from './screens/MyList/MyList';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Header />
      <main>
        <Routes>
        <Route path='/' element={<LandingPage />} exact/>
        <Route path='/login' element={<LoginPage />} exact/>
        <Route path='/register' element={<RegisterPage />} exact/>
        <Route path='/mylist' element={<MyList />} />
        </Routes>
      </main>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
