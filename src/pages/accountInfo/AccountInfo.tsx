import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    createStyles,
    Grid,
    InputLabel,
    makeStyles,
    Theme,
    Tooltip,
    Typography
} from '@material-ui/core';
import React from 'react';
import { FormErrors } from '../../components/FormErrors/FormErrors';
import { ControllTextInput } from '../../components/TextInput/TextInput';
import { validateEmail } from '../../helpers/validators';
import useAccountInfo from '../../hooks/useAccountInfo';
import useChangePassword from '../../hooks/useChangePassword';
import ChangePasswordModal from '../../modules/ChangePasswordModal';
import { textPink } from '../../theme';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridItem: {
            padding: '0 12px !important'
        },
        largeAvatar: {
            width: theme.spacing(10),
            height: theme.spacing(10)
        },
        avatarHolder: {
            display: 'flex',
            paddingTop: 5
        },
        uploadButton: {
            lineHeight: 0,
            margin: '20px 5px 20px 10px',
            backgroundColor: 'transparent',
            border: '1px solid rgb(0 0 0 / 20%)',
            '& > .MuiButton-label': {
                color: textPink
            }
        },
        removeButton: {
            lineHeight: 0,
            margin: '20px 0px',
            backgroundColor: 'transparent',
            border: '1px solid rgb(0 0 0 / 20%)',
            '& > .MuiButton-label': {
                color: textPink
            }
        },
        saveButton: {
            float: 'right',
            lineHeight: 1,
            minWidth: 100
        },
        changePasswordButton: {
            lineHeight: 1,
            minWidth: 120,
            backgroundColor: 'transparent',
            border: '1px solid rgb(256 0 0 / 50%)',
            '& > .MuiButton-label': {
                color: textPink
            }
        }
    })
);

const AccountInfo: React.FC = () => {
    const classes = useStyles();
    const { username, control, errors, onSubmit, handleCapture, uploadRef, handleUpload, profilePicture, removePhoto } =
        useAccountInfo();

    const {
        changePassowordErrors,
        changePasswordControl,
        setChangePasswordModalOpen,
        changePasswordModalOpen,
        changePasswordSubmit,
        closeModal
    } = useChangePassword();

    return (
        <Container component='div' maxWidth='sm'>
            <Card raised className='animate__animated animate__fadeIn animate__slow'>
                <CardHeader
                    title={
                        <Typography variant='h2' align='center'>
                            Account
                        </Typography>
                    }
                />
                <CardContent>
                    <form noValidate onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} className={classes.gridItem}>
                                <InputLabel>Avatar</InputLabel>
                                <Box className={classes.avatarHolder}>
                                    <Avatar className={classes.largeAvatar} src={profilePicture}>
                                        {!profilePicture ? username : null}
                                    </Avatar>
                                    <input
                                        accept='image/*'
                                        hidden
                                        id='btn-upload'
                                        type='file'
                                        ref={uploadRef}
                                        onChange={handleCapture}
                                    />
                                    {!profilePicture ? (
                                        <Tooltip title='Click to upload profile picture!' placement='top'>
                                            <Button
                                                className={classes.uploadButton}
                                                variant='contained'
                                                onClick={handleUpload}
                                            >
                                                Upload
                                            </Button>
                                        </Tooltip>
                                    ) : (
                                        <>
                                            <Tooltip title='Click to change profile picture!' placement='top'>
                                                <Button
                                                    className={classes.uploadButton}
                                                    variant='contained'
                                                    onClick={handleUpload}
                                                >
                                                    Change
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title='Click to remove profile picture!' placement='top'>
                                                <Button
                                                    className={classes.removeButton}
                                                    variant='contained'
                                                    onClick={removePhoto}
                                                >
                                                    Remove
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.gridItem}>
                                <hr />
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridItem}>
                                <ControllTextInput
                                    required
                                    fullWidth
                                    id='first_name'
                                    label='First Name'
                                    name='first_name'
                                    control={control}
                                    rules={{ required: 'First name is required.' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridItem}>
                                <ControllTextInput
                                    required
                                    fullWidth
                                    id='last_name'
                                    label='Last Name'
                                    name='last_name'
                                    control={control}
                                    rules={{ required: 'Last name is required.' }}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <ControllTextInput
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email'
                                    name='email'
                                    control={control}
                                    rules={{ required: 'Email is required.', validate: validateEmail }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.gridItem}>
                                <hr />
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <Button
                                    className={classes.changePasswordButton}
                                    type='button'
                                    variant='contained'
                                    onClick={() => setChangePasswordModalOpen(true)}
                                >
                                    Change password
                                </Button>
                                <Button
                                    className={classes.saveButton}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                >
                                    Save changes
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <FormErrors errors={errors} />
            <ChangePasswordModal
                control={changePasswordControl}
                errors={changePassowordErrors}
                open={changePasswordModalOpen}
                onSubmit={changePasswordSubmit}
                closeModal={closeModal}
            />
        </Container>
    );
};

export default AccountInfo;
