import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, IconButton, Paper, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { LOAD_ACCOUNT } from "../../actions/accountActions";

/**
 * Styles for this component
 * @type {{grow: {flexGrow: number}, root: {flexGrow: number}, menuButton: {marginRight: number, marginLeft: number}}}
 */
const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};

// Prevents collisions with properties
const HomeLink = (props) => <Link to="/" {...props} />;

/**
 * This class represents the Home Page: the page the user sees when they log in.
 * Currently unfinished and here to test routing.
 * @param props
 * @returns {*}
 * @constructor
 */
class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { classes } = this.props;

        return (

            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Home: You logged in!
                        </Typography>
                        <Button color="inherit" component={HomeLink}>Home</Button>
                    </Toolbar>
                </AppBar>
                {Object.values(this.props.account).map( (item) => {
                    return <Paper>{item}</Paper>;
                }) }
            </div>
        );
    }
}

/* TODO: actual account display */

const mapStateToProps = (state) => {
    return {
        account: state.account.accountData
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        dispatchLoadAccount: (account) => dispatch({ type: LOAD_ACCOUNT, payload: { account } })
    }
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const connected = connect(mapStateToProps, mapActionsToProps)(HomePage);

export default withStyles(styles)(connected);