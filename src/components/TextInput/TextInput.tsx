import { createStyles, InputLabel, makeStyles, TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            marginTop: '8px',
            marginBottom: '8px'
        }
    })
);

export const TextInput = (props: TextFieldProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <InputLabel>
                {props.label}
                {props.label && props.required ? '*' : ''}
            </InputLabel>
            <TextField
                required={props.required}
                fullWidth={props.fullWidth}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};
