// import React from 'react';
// import { Route ,Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// // import { Component } from 'react';

// const PrivateRoute=({
//   component:Component,
//   auth:{isAuthenticated,loading},
//   ...rest
// })=>{

//     const ele=(!isAuthenticated && !loading) ? component : <Navigate to='/login'/>;
//       return 
//     <Route
//       {...rest}
//     //   render={(props)=>(!isAuthenticated && !loading ? (
//     //    <Navigate to='/login'/>
//     //    ):(
//     //    <Component {...props}/>
//       element={ele}/>;

//        }

// PrivateRoute.propTypes={
//     auth:PropTypes.object.isRequired

// }

// const mapStateToProps=state=>({
//     auth:state.auth
// })
// export default connect(mapStateToProps) (PrivateRoute);



// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// // import Spinner from '../layout/Spinner';

// const PrivateRoute = ({
//     component: Component,
//     auth: { isAuthenticated, loading }
//   }) => {
    
//     // if (loading) return <Spinner />;
//     if (isAuthenticated) return <Component />;
  
//     return <Navigate to="/login" />;
//   };
// PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired
//   };
  
//   const mapStateToProps = (state) => ({
//     auth: state.auth
//   });
  
// export default connect(mapStateToProps)(PrivateRoute);








// import React from 'react';
// import { Route ,Routes,Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// // import { Component } from 'react';

// const PrivateRoute=({ component, ...rest})=>{
//     // console.log("Log from private route",isAuthenticated,loading);
//     return(
//         (false) ? <Navigate to="/login" /> : component
//     )

    

  
// }

// // PrivateRoute.propTypes={
// //     auth:PropTypes.object.isRequired

// // }

// // const mapStateToProps=state=>({
// //     auth:state.auth
// // })
// export default PrivateRoute;







// import React from 'react';
// import { Route ,Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// // import { Component } from 'react';

// const PrivateRoute=({component:Component,auth:{isAuthenticated,loading}, ...rest})=>(
//     <Route
//         render={isAuthenticated ? <Component /> : <Navigate to="/login" />}
//         />
    
// //   <Route {...rest} render={props=> !isAuthenticated && !loading ? (<Navigate to='/login'/>):(<Component {...props}/>)} />
// )

// PrivateRoute.propTypes={
//     auth:PropTypes.object.isRequired

// }


// const mapStateToProps=state=>({
//     auth:state.auth
// })
// export default connect(mapStateToProps) (PrivateRoute);










import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
//   if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);