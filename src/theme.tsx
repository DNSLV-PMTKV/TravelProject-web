import { createMuiTheme } from '@material-ui/core/styles';

export const black = '#303030';
// const white = '#f8f5fb';

export const mobileBreak = 650;

const defaultTheme = createMuiTheme();

// Create a theme instance.
export const theme = createMuiTheme({
    palette: {},
    typography: {
        h2: {
            color: black,
            fontSize: '3rem',
            fontWeight: 900,
            padding: '0 0 1rem'
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
                margin: '12px 0',
                borderRadius: '32px'
            },
            label: {
                color: black,
                fontWeight: 'inherit'
            },
            fullWidth: {
                fontWeight: 700,
                width: '75%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '12px auto'
            }
        },
        MuiInputLabel: {
            root: {
                fontSize: 15,
                color: black
            }
        },
        MuiTextField: {
            root: {
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        border: '1px solid rgba(0, 0, 0, 0.23)'
                    },
                    '&.Mui-focused fieldset': {
                        border: '1px solid rgba(0, 0, 0, 0.23)'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            input: {
                padding: '10px 10px'
            }
        },
        MuiSvgIcon: {
            root: {
                marginRight: '7px'
            }
        },
        MuiFormControl: {
            marginNormal: {
                [defaultTheme.breakpoints.down(mobileBreak)]: {
                    marginTop: '8px'
                }
            }
        },
        MuiBottomNavigationAction: {
            root: {
                color: `${black} !important`,
                '&$selected': {
                    color: '#3f51b5 !important'
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
            autoComplete: 'off'
        },
        MuiBottomNavigationAction: {
            disableRipple: true,
            disableTouchRipple: true,
            focusRipple: false
        }
    }
});
