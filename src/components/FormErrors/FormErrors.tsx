import { createStyles, makeStyles, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';

interface Props {
    errors: (string[] | undefined)[];
}

const useStyles = makeStyles(() =>
    createStyles({
        errorBadge: {
            marginRight: '7px'
        },
        errors: {
            marginTop: '.75rem',
            color: '#d10707',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
);

export const FormErrors = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <div>
            {props.errors.map((err, key) => {
                if (err) {
                    return (
                        <Typography key={`err-${key}`} variant='body2' align='center' className={classes.errors}>
                            <ErrorIcon className={classes.errorBadge} />
                            {err}
                        </Typography>
                    );
                }
            })}
        </div>
    );
};
