import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE,GET_PROFILES,UPDATE_PROFILE,PROFILE_ERROR,CLEAR_PROFILE,ACCOUNT_DELETED,GET_REPOS } from "./types";




// Using promise

// const data=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve ()
  
//     },1000)
//  })
// data.then((item)=>{  //Jab ham ek se jyada promise resolve karte hai to wo promise chaining hoti hai.
//     const res=axios.get('/api/profile/me');
//     dispatch({
//         type:GET_PROFILE,
//         payload:res.data
//     })
// }).catch ((result)=>{
//     reject()
//     dispatch({
//         type:PROFILE_ERROR,
//         payload:{msg:err.response.statusText,status:err.response.status}
//     })
// })



// Get the current users profile

export const getCurrentProfile=()=>async dispatch =>{
    try {
        const res=await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        console.log(res.data)
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

// Get all profiles

export const getProfiles=()=> async dispatch =>{
    dispatch ({type:CLEAR_PROFILE});
    try {
        const res=await axios.get('/api/profile')
        dispatch({
          type: GET_PROFILES,
          payload: res.data
        });
        console.log(res.data)
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
// Get profile by Id


export const getProfileById=userId=>async dispatch =>{

    try {
        const res=await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        console.log(res.data)
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}



// Get GitHub repos

export const getGithubRepos=username=>async dispatch =>{

    try {
        const res=await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
        console.log(res.data)
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
//  Create or update profile

export const createProfile=(formData,history,edit=false)=> async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated':'Profole Created','success'));

        if(!edit){
            history.push('/dashboard');
        }
        
    } catch (err) {
        const errors=err.response.data.errors;
        console.log(errors)
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        
    }
}


// Add experience


export const addExperience=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.put('/api/profile/experience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Added','success'));

        
        history.push('/dashboard');
        
        
    } catch (err) {
        const errors=err.response.data.errors;
        console.log(errors)
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        
    }

}


// Add education


export const addEducation=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.put('/api/profile/education',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Added','success'));

        
        history.push('/dashboard');
        
        
    } catch (err) {
        const errors=err.response.data.errors;
        console.log(errors)
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        
    }

}

// Delete experience

export const deleteExperience = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


//   Delete Education

export const deleteEducation = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Delete Account and Profile

export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete('api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
  
        dispatch(setAlert('Your account has been permanently deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };












// import axios from 'axios';
// import { setAlert } from './alert';
// import api from '../utils/api';
// // import navigate from 'http'


// import {
//   GET_PROFILE,
//   GET_PROFILES,
//   PROFILE_ERROR,
//   UPDATE_PROFILE,
//   CLEAR_PROFILE,
//   ACCOUNT_DELETED
// } from './types';

// export const getCurrentProfile=()=> async dispatch =>{
//   try {
//       const res=await axios.get('/api/profile/me');
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// }

// export const getProfiles=()=> async dispatch =>{
//   dispatch ({type:CLEAR_PROFILE});
//   try {
//       const res=await axios.get('/api/profile');
//       // console.log(res)
//       dispatch({
//         type: GET_PROFILES,
//         payload: res.data
//       });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// }

// export const getProfileById= userId=> async dispatch =>{
//   try {
//     const config={
//       method:'POST',
//       mode:"cors",
//       credentials:'include',
//       headers:{
//           'Content-type':'application/json',
//             'Content-Type': 'application/json ',
//             'Accept': 'application/json',
//             "Access-Control-Origin": "*"}}
      
//       const res=await axios.get(`/api/profile/user/${userId}`);
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// }
// // create or update a profile
// export const createProfile=(formData,history,edit=false)=>async dispatch=>{
//   try {
//             const config={
//                 method:'POST',
//                 mode:"cors",
//                 credentials:'include',
//                 headers:{
//                     'Content-type':'application/json',
//                       'Content-Type': 'application/json ',
//                       'Accept': 'application/json',
//                       "Access-Control-Origin": "*"
//                 }
//             }
//             // const body=JSON.stringify(newUser);
//     const res=await axios.post('/api/profile',formData,config);
//     // console.log(res.data)
//     // const res = await axios.post('/api/profile',formData,config);
//     dispatch({
//       type:GET_PROFILE,
//       payload:res.data
//     })
//     dispatch(setAlert(edit? 'Profile Updated':'Profile Created'));
//     if(!edit){
//       history.push('/dashboard')
//     }

//   } catch (err) {
//     const errors=err.response.data.errors;
//     if(errors){
//         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
//     }
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//     console.log(err.response.data)
//   }
// }
// export const addExperience =(formData,history) => async dispatch =>{
//   // try {
//   //   const res = await api.put('/profile/experience', formData);

//   //   dispatch({
//   //     type: UPDATE_PROFILE,
//   //     payload: res.data
//   //   });
//   try {
//     const config={
//         method:'PUT',
//         mode:"cors",
//         credentials:'include',
//         headers:{
//             'Content-type':'application/json',
//               // 'Content-Type': 'application/json ',
//               // 'Accept': 'application/json',
//               // "Access-Control-Origin": "*"
//         }
//     }
//     // const body=JSON.stringify(newUser);
//     const res=await axios.put('/api/profile/experience',formData,config);

//     dispatch(setAlert('Experience Added', 'success'));

//     // navigate('/dashboard');
//       history.push('/dashboard')
//   } catch (err) {
//       const errors = err.response.data.errors;

//       if (errors) {
//         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//       }

//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status }
//       });
//     }
// }
// export const addEducation =(formData,history) => async dispatch =>{
//   // try {
//   //   const res = await api.put('/profile/experience', formData);

//   //   dispatch({
//   //     type: UPDATE_PROFILE,
//   //     payload: res.data
//   //   });
//   try {
//     const config={
//         method:'PUT',
//         mode:"cors",
//         credentials:'include',
//         headers:{
//             'Content-type':'application/json',
//               'Content-Type': 'application/json ',
//               'Accept': 'application/json',
//               "Access-Control-Origin": "*"
//         }
//     }
//     // const body=JSON.stringify(newUser);
//     const res=await axios.put('/api/profile/education',formData,config);

//     dispatch(setAlert('Education Added', 'success'));

//     // navigate('/dashboard');
//       history.push('/dashboard')
//   } catch (err) {
//       const errors = err.response.data.errors;

//       if (errors) {
//         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//       }

//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status }
//       });
//     }
// }

// // Delete experience
// export const deleteExperience = (id) => async (dispatch) => {
//   // try {
//   //   const res = await api.delete(`/profile/experience/${id}`);

//   //   dispatch({
//   //     type: UPDATE_PROFILE,
//   //     payload: res.data
//   //   });
//   try {
//     const res=await axios.delete(`api/profile/experience/${id}`);
//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Experience Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// // Delete education
// export const deleteEducation = (id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(`api/profile/education/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Education Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
// export const deleteAccount = () => async (dispatch) => {
//   if (window.confirm('Are you sure? This can NOT be undone!')) {
//     try {
//       await axios.delete('api/profile');

//       dispatch({ type: CLEAR_PROFILE });
//       dispatch({ type: ACCOUNT_DELETED });

//       dispatch(setAlert('Your account has been permanently deleted'));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status }
//       });
//     }
//   }
// };