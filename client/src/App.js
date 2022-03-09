import React,{ Fragment } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
// import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App=() =>{
    return (
    <Router>
        <Fragment>
            <Navbar/>
            <Routes>
            <Route exact path='/' element={<Landing/>}/>
            {/* <section className='container'> */}
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                

            {/* </section>  */}
            </Routes>
        </Fragment>
    </Router>
    )
}

export default App;
