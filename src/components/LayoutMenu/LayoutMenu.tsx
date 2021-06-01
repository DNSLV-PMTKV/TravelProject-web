import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { pink } from '../../theme';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { setAuthenticated } from '../../redux/users/userActions';
import UserRequests from '../../requests/userRequests';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        paper: {
            marginRight: theme.spacing(2)
        },
        button: {
            color: pink,
            textDecorationColor: pink,
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            margin: 0,
            lineHeight: 0,
            '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: pink,
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                margin: 0,
                lineHeight: 0
            },
            '&:active': {
                textDecoration: 'underline',
                textDecorationColor: pink,
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                margin: 0,
                lineHeight: 0
            },
            '&:focus-visible': {
                textDecoration: 'underline',
                textDecorationColor: pink,
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                margin: 0,
                lineHeight: 0
            },
            '& > .MuiButton-label': {
                color: pink
            }
        },
        icons: {
            marginRight: theme.spacing(2)
        }
    })
);

const LayoutMenu = (): JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleProfileClick = () => {
        history.push('/account');
        setOpen(false);
    };

    const handleLogoutClick = () => {
        UserRequests.logout().then(() => {
            history.push('/login');
            dispatch(setAuthenticated(false));
            localStorage.removeItem('user_email');
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
        });
    };

    return (
        <div className={classes.root}>
            <Button
                className={classes.button}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
            >
                {localStorage.getItem('user_email')}
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleProfileClick}>
                                        <AccountCircle className={classes.icons} /> Account
                                    </MenuItem>
                                    <MenuItem onClick={handleLogoutClick}>
                                        <ExitToApp className={classes.icons} /> Logout
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default LayoutMenu;
