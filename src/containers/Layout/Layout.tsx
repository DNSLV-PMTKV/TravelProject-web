import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import TelegramIcon from '@material-ui/icons/Telegram';
import React, { Fragment, useEffect } from 'react';
import { mobileBreak, pink } from '../../theme';

interface Props {
    children: JSX.Element;
    authenticated: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            [theme.breakpoints.down(mobileBreak)]: {
                marginBottom: 75
            }
        },
        bar: {
            marginBottom: '5%',
            [theme.breakpoints.down(mobileBreak)]: {
                margin: 0,
                position: 'relative'
            }
        },
        leftButton: {
            marginRight: '1em',
            fontWeight: 'bold',
            color: pink
        },
        rightButton: {
            fontWeight: 'bold',
            color: pink
        },
        titleContainer: {
            [theme.breakpoints.down(mobileBreak)]: {
                margin: 'auto'
            }
        },
        title: {
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            color: pink
        },
        button: {
            borderRadius: 30,
            padding: '7px 20px'
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up(mobileBreak)]: {
                display: 'flex'
            }
        },
        mobileSection: {
            display: 'flex',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 1100,
            [theme.breakpoints.up(mobileBreak)]: {
                display: 'none'
            }
        },
        mobileSetionIcon: {
            marginRight: 0
        }
    })
);

export const Layout: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    let location = window.location.pathname;

    const [selectedPage, setSelectedPage] = React.useState('/');

    useEffect(() => {
        location = window.location.pathname;
        setSelectedPage(location);
    }, [selectedPage]);

    const loggedUserOptions = [
        <BottomNavigationAction
            key='logged1'
            label='Login'
            value='/login'
            icon={<AccountCircleRoundedIcon className={classes.mobileSetionIcon} />}
            component={Link}
            href='/login'
        />,
        <BottomNavigationAction
            key='logged2'
            label='Register'
            value='/register'
            icon={<AccountBoxRoundedIcon className={classes.mobileSetionIcon} />}
            component={Link}
            href='/register'
        />
    ];

    const renderMobileMenu = (
        <BottomNavigation
            value={selectedPage}
            onChange={(_, newValue) => {
                setSelectedPage(newValue);
            }}
            showLabels
            className={classes.mobileSection}
        >
            <BottomNavigationAction
                label='Home'
                value='/'
                icon={<HomeRoundedIcon className={classes.mobileSetionIcon} />}
                component={Link}
                href='/'
            />
            {props.authenticated ? (
                <BottomNavigationAction
                    label='Account'
                    value='/acount'
                    icon={<AccountCircleRoundedIcon className={classes.mobileSetionIcon} />}
                    component={Link}
                    href='/account'
                />
            ) : (
                loggedUserOptions
            )}
        </BottomNavigation>
    );

    const renderDesktopMenu = (
        <div className={classes.sectionDesktop}>
            {props.authenticated ? (
                <Link href='/account' className={classes.rightButton}>
                    Account
                </Link>
            ) : (
                <Fragment>
                    <Link href='/login' className={classes.leftButton}>
                        Login
                    </Link>
                    <Link href='/register' className={classes.rightButton}>
                        Register
                    </Link>
                </Fragment>
            )}
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position='sticky' className={classes.bar}>
                <Toolbar className={classes.titleContainer} variant='dense'>
                    <Link href='/'>
                        <Typography variant='h6' className={classes.title}>
                            <TelegramIcon fontSize='large' />
                            Travel Project
                        </Typography>
                    </Link>
                    {renderDesktopMenu}
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {props.children}
        </div>
    );
};
