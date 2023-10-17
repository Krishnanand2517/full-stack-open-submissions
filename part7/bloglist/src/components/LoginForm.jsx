import { Button, Container, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <Container>
            <div>
                <h2>Login to the application</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            label="Username"
                            size='small'
                            value={username}
                            name="Username"
                            id="username"
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            label="Password"
                            type="password"
                            size='small'
                            value={password}
                            name="Password"
                            id="password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <br />
                    <Button variant='contained' color='success' id="login-button" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default LoginForm;