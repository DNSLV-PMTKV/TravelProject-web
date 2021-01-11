import { Container, createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTitle } from '../../helpers/useTitle';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            height: 100,
            top: 'calc(50% - 100px)',
            left: '50%',
            transform: 'translateX(-50%)',
            position: 'absolute'
        },
        404: {
            padding: 0,
            lineHeight: 1,
            fontWeight: 900
        },
        text: {
            lineHeight: 1,
            fontWeight: 300
        }
    })
);

const Error: React.FC = () => {
    useTitle('Travel Project | 404');

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography variant='h2' align='center' className={classes['404']}>
                404
            </Typography>
            <Typography variant='subtitle1' align='center' className={classes.text}>
                Page does not exist.
            </Typography>
        </Container>
    );
};

export default Error;
