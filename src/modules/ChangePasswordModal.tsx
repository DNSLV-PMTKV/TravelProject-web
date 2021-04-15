import { Backdrop, Button, createStyles, Fade, makeStyles, Modal, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { Control, DeepMap, FieldError } from 'react-hook-form';
import { FormErrors } from '../components/FormErrors/FormErrors';
import { ControllTextInput } from '../components/TextInput/TextInput';
import { ChangePasswordInterface } from '../requests/userRequests';
import { blue } from '../theme';

interface Props {
    open: boolean;
    control: Control;
    errors: DeepMap<ChangePasswordInterface, FieldError>;
    onSubmit: () => void;
    closeModal: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4, 6),
            outline: 'none',
            width: 350
        },
        separator: {
            marginBottom: theme.spacing(2)
        },
        saveButton: {
            lineHeight: 1,
            minWidth: 100
        },
        cancelButton: {
            lineHeight: 1,
            minWidth: 100,
            backgroundColor: 'transparent',
            border: '1px solid rgb(256 0 0 / 50%)',
            '& .MuiButton-label': {
                color: blue
            }
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    })
);

const ChangePasswordModal = ({ errors, open, control, onSubmit, closeModal }: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={open}>
                <Paper elevation={3} variant='outlined' className={classes.paper}>
                    <Typography variant='h4' align='center'>
                        Change Password
                    </Typography>
                    <hr className={classes.separator} />
                    <form noValidate onSubmit={onSubmit}>
                        <ControllTextInput
                            required
                            fullWidth
                            type='password'
                            id='old_password'
                            label='Old Password'
                            name='old_password'
                            control={control}
                            rules={{ required: 'Old password is required.' }}
                        />
                        <ControllTextInput
                            required
                            fullWidth
                            type='password'
                            id='new_password'
                            label='New Password'
                            name='new_password'
                            control={control}
                            rules={{ required: 'New password is required.' }}
                        />
                        <ControllTextInput
                            required
                            fullWidth
                            type='password'
                            id='re_password'
                            label='Re-Password'
                            name='re_password'
                            control={control}
                            rules={{ required: 'Re-password is required.' }}
                        />
                        <div className={classes.buttonContainer}>
                            <Button
                                className={classes.cancelButton}
                                type='button'
                                variant='contained'
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                            <Button className={classes.saveButton} type='submit' variant='contained' color='primary'>
                                Submit
                            </Button>
                        </div>
                    </form>
                    <FormErrors errors={errors} />
                </Paper>
            </Fade>
        </Modal>
    );
};

export default ChangePasswordModal;
