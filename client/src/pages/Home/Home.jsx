import './home.css';
import AddUser from '../../components/AddUser';
import AllUsers from '../../components/AllUsers';
import { BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";

const nav = {
    color: "#000", 
    textDecoration: "none"
}

const Home = () => {
  return (
    <Router>
        <div className='container'>
            <div className="navbar">
                <div className="tab1"><NavLink style={nav} to="/adduser">Add User</NavLink></div>
                <div className='tab2'><NavLink style={nav} to="/allusers">All Users</NavLink></div>
            </div>
            <Switch>
                <Route exact path="/adduser" component={AddUser} />
                <Route exact path="/allusers" component={AllUsers} />
            </Switch>
        </div>
    </Router>
  );
};

export default Home;
