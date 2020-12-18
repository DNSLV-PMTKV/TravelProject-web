import { createMuiTheme } from '@material-ui/core/styles';

const black = '#333';
// const white = '#f8f5fb';

// Create a theme instance.
export const theme = createMuiTheme({
    palette: {},
    typography: {
        // fontFamily: 'Quicksand, sans-serif',
        h2: {
            color: black,
            fontSize: '3rem',
            fontWeight: 900,
            padding: '0 0 .5rem'
        }
    },
    overrides: {
        MuiAppBar: {
            root: {
                backdropFilter: 'blur(2px)'
            },
            colorPrimary: {
                backgroundColor: 'transparent',
                color: black
            }
        },
        MuiToolbar: {
            root: {
                justifyContent: 'space-between'
            },
            gutters: {
                ['@media (min-width: 600px)']: {
                    padding: '0 5em'
                    // margin: 'auto',
                }
            }
        },
        MuiButton: {
            root: {
                backGroundColor: '#f9c5d1',
                backgroundImage: 'linear-gradient(120deg, rgba(0,212,255,1) 0%, rgba(249,197,209,1) 60%)',
                padding: '.75rem',
                margin: '12px 0'
            },
            label: {
                color: black,
                fontWeight: 'inherit'
            },
            fullWidth: {
                fontWeight: 700
            }
        },
        MuiInputLabel: {
            outlined: {
                color: black,
                fontSize: 18
            }
        },
        MuiTextField: {
            root: {
                backgroundColor: 'white',
                '& label.Mui-focused': {
                    color: black
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'green'
                },
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        border: '1px solid rgba(0, 0, 0, 0.23)'
                    },
                    '&.Mui-focused fieldset': {
                        border: '1px solid rgba(0, 0, 0, 0.23)'
                    }
                }
            }
        }
    },
    props: {
        MuiAppBar: {
            elevation: 0
        },
        MuiButton: {
            disableRipple: true,
            variant: 'contained'
        },
        MuiTextField: {
            variant: 'outlined',
            InputLabelProps: {
                shrink: true
            },
            autoComplete: 'off',
            margin: 'normal'
        }
    }
});
