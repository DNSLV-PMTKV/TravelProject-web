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
import { blue } from '../../theme';

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
            '& .MuiButton-label': {
                color: blue
            }
        },
        removeButton: {
            lineHeight: 0,
            margin: '20px 0px',
            backgroundColor: 'transparent',
            border: '1px solid rgb(0 0 0 / 20%)',
            '& .MuiButton-label': {
                color: blue
            }
        },
        saveButton: {
            float: 'right',
            lineHeight: 1,
            minWidth: 100
        }
    })
);

const AccountInfo: React.FC = () => {
    const classes = useStyles();
    const { username, control, errors, onSubmit } = useAccountInfo();

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
                                    <Avatar className={classes.largeAvatar}>{username}</Avatar>
                                    <Tooltip title='Click to change profile picture!' placement='top'>
                                        <Button className={classes.uploadButton} variant='contained'>
                                            Upload
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title='Click to remove profile picture!' placement='top'>
                                        <Button className={classes.removeButton} variant='contained'>
                                            Remove
                                        </Button>
                                    </Tooltip>
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
        </Container>
    );
};

export default AccountInfo;
