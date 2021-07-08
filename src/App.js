import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import loadable from "@loadable/component";

const UsersList = loadable(() => import('./components/users-list.component'), {
  fallback: <div />
});

const CreateUser = loadable(() => import('./components/create-user.component'), {
  fallback: <div />
});

const Login = loadable(() => import('./components/login'), {
  fallback: <div />
});

const CustomerShop = loadable(() => import('./components/customer-shop'), {
  fallback: <div />
});

const VendorShop = loadable(() => import('./components/vendor-shop'), {
  fallback: <div />
});

const NewProduct = loadable(() => import('./components/create-new-product'), {
  fallback: <div />
});

const Results = loadable(() => import('./components/displayresults'), {
  fallback: <div />
});

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;