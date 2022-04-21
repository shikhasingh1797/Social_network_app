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
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import ProfileItem from './components/profiles/ProfileItem';

// Redux
import { Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
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
                    <Route path='/profiles' element={<Profiles/>}/>
                    <Route path='/profile/:id' element={<Profile/>}/>
                    {/* <PrivateRoute exact path='/dashboard' component={<Dashboard/>}/> */}


                    {/* <Route
                        exact path="/dashboard"
                        element={localStorage.token ? <Dashboard /> : <Navigate to="/login" />}
                        /> */}

                    <Route exact path='/dashboard' element={<PrivateRoute component={Dashboard} />}/> 
                    <Route exact path='/create-profile' element={<PrivateRoute component={CreateProfile} />}/> 
                    <Route exact path='/edit-profile' element={<PrivateRoute component={EditProfile} />}/> 
                    <Route exact path='/add-experience' element={<PrivateRoute component={AddExperience} />}/>
                    <Route exact path='/add-education' element={<PrivateRoute component={AddEducation} />}/>
            </Routes>
        </Fragment>
    </Router>
    </Provider>
    )
}

export default App;
