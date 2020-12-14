import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import TelegramIcon from '@material-ui/icons/Telegram';
import React from 'react';

interface Props {
    children: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        bar: {
            marginBottom: '5%'
        },
        menuButton: {
            marginRight: theme.spacing(0)
        },
        title: {
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600
        },
        button: {
            borderRadius: 30,
            padding: '7px 20px'
        }
    })
);

export const Layout: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='sticky' className={classes.bar}>
                <Toolbar>
                    <Link href='/'>
                        <Typography variant='h5' className={classes.title}>
                            <TelegramIcon fontSize='large' style={{ marginRight: '7px' }} />
                            Travel Project
                        </Typography>
                    </Link>
                    <Link href='/login'>
                        <Button className={classes.button}>
                            <AccountCircleIcon style={{ marginRight: '7px' }} />
                            Login
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    );
};
