import React from "react";
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Paper
} from "@material-ui/core";
import accountService from "../services/accountService";
import { LOGIN, LOAD_ACCOUNT } from "../actions/accountActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { MAX_NAME, MAX_PASSWORD } from "../services/AccountInputValidation";

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: false,
            loading: false,
            username: '',
            password: '',
            attempts: 0
        };
    }


    updateUsername = (event) => {
        this.setState({username: event.target.value });
    };

    updatePassword = (event) => {
        this.setState({password: event.target.value });
    };

    // validate

    login = () => {
        const { attempts, username, password } = this.state;
        if (attempts >= 5) {
            this.setState({
                error: true,
                loading: false
            });
            return;
        }
        this.setState({ loading: true, attempts: attempts + 1 });
        accountService.validateAccount(username, password)
            .then( (token) => {
                this.props.dispatchLogin(token);
                this.setState({ attempts: 0});
                return accountService.getAccountByUsername(token, username);

            })
            .then( (account) => {
                this.props.dispatchLoadAccount(account);
                this.handleClose();
                this.props.history.push('/home');
            })
            .catch( (error) => {
                this.setState({
                    error: true,
                    loading: false,
                    errorMessage: error.message
                });
            });
    };



    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            error: false,
            loading: false,
        });
    };

    render() {

        return (


            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleClickOpen}
                >
                    Login
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="login-dialog"
                >
                    <DialogTitle id="login-dialog">Login!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your username and password to login!
                        </DialogContentText>
                        <TextField
                            error={this.state.error}
                            inputProps={{ maxLength: MAX_NAME }}
                            required
                            autoFocus
                            id="username"
                            label="username"
                            type="text"
                            onChange={this.updateUsername}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            error={this.state.error}
                            inputProps={{ maxLength: MAX_PASSWORD }}
                            required
                            id="password"
                            label="password"
                            type="password"
                            onChange={this.updatePassword}
                            margin="dense"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        {this.state.loading && <CircularProgress size={24} />}
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.login}
                            color="primary"
                            disabled={this.state.loading}

                        >
                            Login
                        </Button>
                        {(this.state.attempts >= 5) && <Paper>You have tried to log on more than 5 times</Paper>}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};

/**
 *
 * @param state
 * @returns {{token: *}}
 */
const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        isAuthenticated: state.account.isAuthenticated
    }
};

/**
 *
 * @param dispatch
 * @returns {{dispatchLogin: (function(*): *)}}
 */
const mapActionsToProps = (dispatch) => {
    return {
        dispatchLogin: (token) => dispatch({ type: LOGIN, payload: { token } }),
        dispatchLoadAccount: (accountData) => dispatch({type: LOAD_ACCOUNT, payload: { accountData } })
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(LoginDialog);

export default withRouter(connected);
