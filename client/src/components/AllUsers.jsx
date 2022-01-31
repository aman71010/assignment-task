import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { users } from '../data';

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
})

const AllUsers = () => {
  const classes = useStyles();
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
                <TableRow key={user.username}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.number}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell><DeleteIcon className={classes.btn}/></TableCell>
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
