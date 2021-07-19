import React from 'react';
import { Suspense} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const UsersList = React.lazy(() => import(/* webpackChunkName: "users-list.component" */ './components/users-list.component'));
const CreateUser = React.lazy(() => import(/* webpackChunkName: "create-user.component" */ './components/create-user.component'));
const Login = React.lazy(() => import(/* webpackChunkName: "login" */ './components/login'));
const CustomerShop = React.lazy(() => import(/* webpackChunkName: "customer-shop" */ './components/customer-shop'));
const VendorShop = React.lazy(() => import(/* webpackChunkName: "vendor-shop" */ './components/vendor-shop'));
const NewProduct = React.lazy(() => import(/* webpackChunkName: "create-new-product" */ './components/create-new-product'));
const Results = React.lazy(() => import(/* webpackChunkName: "displayresults" */ './components/displayresults'));

function App() {
  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">App</Link>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                      <Link to="/" className="nav-link">Users</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/create" className="nav-link">Create User</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/login" className="nav-link">User Login</Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <br/>
              <Route path="/" exact component={UsersList}/>
              <Route path="/create" component={CreateUser}/>
              <Route path="/login" component={Login}/>
              <Route path="/customershop" component={CustomerShop}/>
              <Route path="/vendorshop" component={VendorShop}/>
              <Route path="/createproduct" component={NewProduct}/>
              <Route path="/results" component={Results}/>
            </div>
        </Suspense>
      </Router>
  );
}

export default App;