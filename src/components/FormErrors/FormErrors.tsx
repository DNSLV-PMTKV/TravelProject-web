import { createStyles, makeStyles, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: DeepMap<any, FieldError>;
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

export const FormErrors = ({ errors }: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <div>
            {Object.keys(errors).map((err, key) => {
                if (err) {
                    return (
                        <Typography key={`err-${key}`} variant='body2' align='center' className={classes.errors}>
                            <ErrorIcon className={classes.errorBadge} />
                            {errors[err].message}
                        </Typography>
                    );
                }
            })}
        </div>
    );
};
