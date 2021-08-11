import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {styles} from './style'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
                <div >
                <h2 style={styles.Header}>Login</h2>
                <form style={styles.Login} name="form" onSubmit={this.handleSubmit}>
                    <div >
                        <b><label style={styles.Label} htmlFor="email">Email Id</label></b>
                        <input style={styles.Uname} type="text"  name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div>Email Id is required</div>
                        }
                    </div>
                    <br/><br/>
                    <div>
                        <b><label style={styles.Label} htmlFor="password">Password</label></b>
                        <input style={styles.Pass} type="password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div>Password is required</div>
                        }
                    </div>
                    <br/><br/>
                    <div className="form-group">
                        <button style={styles.Log}>Login</button>
                        {loggingIn &&
                            <p style={styles.Loading}>Please wait...</p>
                        }
                    </div>
                </form>
                </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };