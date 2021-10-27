import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login/login";
import Signup from "./Signup/signup";
import Admin from "./Admin/admin";
import Customer from "./Customer/customer";
import Cart from "./Cart/cart";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container_app">
      <Switch>
        <Route exact path="/">
          <div className="home">
            <h1>Do you want to?</h1> <br />
            <Link to="/login" className="login">
              login
            </Link>
            <Link to="/signup" className="signup">
              signup
            </Link>
          </div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/customer">
          <Customer />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
