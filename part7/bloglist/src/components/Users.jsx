import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Users = ({ users }) => {
    // const tableStyle = {
    //     backgroundColor: 'gold'
    // };

    return (
        <div>
            <Typography variant='h5' gutterBottom>Users</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell >blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell><Link to={`${user.id}`}>{user.name}</Link></TableCell>
                                    <TableCell>{user.blogs.length}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Users;