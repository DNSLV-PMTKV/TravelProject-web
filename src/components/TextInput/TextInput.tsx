import { createStyles, InputLabel, makeStyles, TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

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
                type={props.type}
            />
        </div>
    );
};

export const ControllTextInput = (
    props: TextFieldProps & { control: Control; rules?: RegisterOptions }
): JSX.Element => {
    const classes = useStyles();

    return (
        <Controller
            name={props.name ? props.name : ''}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue ? props.defaultValue : ''}
            as={
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
                        type={props.type}
                    />
                </div>
            }
        />
    );
};
