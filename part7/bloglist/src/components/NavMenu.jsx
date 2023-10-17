import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const NavMenu = ({ loggedInUser, handleLogout }) => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Button color='inherit' component={Link} to='/'>blogs</Button>
                <Button color='inherit' component={Link} to='/users' sx={{ mr: 1 }}>users</Button>
                <span className='nav-item'>
                    {loggedInUser.name} logged in
                    <Button variant='contained' color='warning' size='small' sx={{ ml: 1, p: 0.5 }} onClick={handleLogout}>
                        logout
                    </Button>
                </span>
            </Toolbar>
        </AppBar>
    );
};

export default NavMenu;