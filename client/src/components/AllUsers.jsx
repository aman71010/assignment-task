import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../requestMethods';

const useStyles = makeStyles({
  table: {
    margin: "50px 0",
  },
  thead: {
    '& > *': {
        fontSize: 20,
        backgroundColor: "#b0bec5",
        color: '#FFFFFF',
    }
  },
  row: {
      '& > *': {
          fontSize: 18
      }
  },
  btn: {
    fontSize: "80px",
    color: "#f44336",
    cursor: "pointer"
  }
});

const AllUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const TOKEN = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const userRequest = axios.create({
    baseURL:  BASE_URL,
    headers:  {token: `Bearer ${TOKEN}`}
  });

  useEffect( () => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try{
        const res = await userRequest.get("/user/");
        if(res){
            //console.log(res);
            setUsers(res.data);
        }
    }catch(err){
        console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try{
      const res = await userRequest.delete(`/user/${id}`);
      //console.log(res.data);
      getAllUsers();
    }catch(err){
      console.log(err);
    }
  };

  return (
  <div>
    <h1 style={{textAlign: "center"}} >All Users</h1>
    <div style={{width: "90%", margin: "0 auto"}}>
      <Table className={classes.table}>
        <TableHead className={classes.thead}>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell><DeleteIcon className={classes.btn} onClick={ () => deleteUser(user._id) }/></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  </div>
  );
};

export default AllUsers;
