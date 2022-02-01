import './home.css';
import AddUser from '../../components/AddUser';
import AllUsers from '../../components/AllUsers';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
import jwt_decode from 'jwt-decode';

const nav = {
    color: "#000", 
    textDecoration: "none"
}

const Home = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        setUser(null);
        history.push("/"); 
    };

    useEffect( () => {
        const token = user?.accessToken;
        if(token){
            const decodedToken = jwt_decode(token);
            if(decodedToken.exp*1000 < new Date().getTime()) logout();
        }
    });

    return (
        user ? (
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
        ): (
            `${history.push("/")}`
        )
    );
};

export default Home;
