import React,{ Fragment , useEffect} from 'react';
// import React from 'react';
import { BrowserRouter as Router, Routes , Route,Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
// import PrivateRoute from './components/routing/PrivateRoute';
// import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
    setAuthToken(localStorage.token);
}
const App=() =>{
    useEffect(()=>{

        store.dispatch(loadUser());
    },[]);
    return (
        
    <Provider store={store}>
        <Router>
        <Fragment>
            <Navbar/>
            <Alert/>
            <Routes>
            <Route exact path='/' element={<Landing/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    {/* <PrivateRoute exact path='/dashboard' component={<Dashboard/>}/> */}


                    {/* <Route
                        exact path="/dashboard"
                        element={localStorage.token ? <Dashboard /> : <Navigate to="/login" />}
                        /> */}

                    <Route exact path='/dashboard' element={<PrivateRoute component={Dashboard} />}/> 
                    {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
            </Routes>
        </Fragment>
    </Router>
    </Provider>
    )
}

export default App;
