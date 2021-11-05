import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LandingPage from './screens/LandingPage/LandingPage'
import MyList from './screens/MyList/MyList'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Header />
      <main>
        <Routes>
        <Route path='/' element={<LandingPage />} exact/>
        <Route path='/mylist' element={<MyList />} />
        </Routes>
      </main>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
