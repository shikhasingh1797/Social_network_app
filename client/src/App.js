import React,{ Fragment } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

const App=() =>{
    return (
        
    <Provider store={store}>
        <Router>
        <Fragment>
            <Navbar/>
            <Alert/>
            <Routes>
            <Route exact path='/' element={<Landing/>}/>
            {/* <section className='container'> */}
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                

            {/* </section>  */}
            </Routes>
        </Fragment>
    </Router>
    </Provider>
    )
}

export default App;
