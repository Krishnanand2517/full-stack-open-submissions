import PropTypes from "prop-types";

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <h2>Login to the application</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    Username:
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    Password:
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="login-button" type="submit">Login</button>
            </form>
        </div>
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