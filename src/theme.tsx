import { createMuiTheme } from '@material-ui/core/styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from '@material-ui/lab/themeAugmentation';

export const black = '#303030';
export const pink = '#ffc0cb';
export const textPink = '#c6677a';
export const lightGray = '#eee';
export const textGray = '#545454';
export const blue = '#355c7d';
// const white = '#f8f5fb';

export const mobileBreak = 650;

const defaultTheme = createMuiTheme();

// Create a theme instance.
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue
        }
    },
    typography: {
        subtitle2: {
            color: textGray
        },
        h2: {
            color: textGray,
            fontSize: '2.5rem',
            fontWeight: 900,
            lineHeight: 1
        },
        fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif'
    },
    overrides: {
        MuiAppBar: {
            root: {
                backdropFilter: 'blur(2px)'
            },
            colorPrimary: {
                backgroundColor: blue,
                color: pink
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
                padding: '.75rem',
                margin: '12px 0',
                backgroundColor: textPink,
                border: `1px solid ${textPink}`,
                borderRadius: '8px',
                textTransform: 'none'
            },
            label: {
                color: 'white',
                fontWeight: 'inherit'
            },
            fullWidth: {
                fontWeight: 700,
                width: '60%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '12px auto'
            },
            containedPrimary: {
                backgroundColor: textPink,
                '&:hover': {
                    backgroundColor: textPink,
                    filter: 'brightness(90%)'
                }
            }
        },
        MuiInputLabel: {
            root: {
                fontFamily: 'Helvetica',
                fontWeight: 600,
                fontSize: 15,
                color: textGray
            }
        },
        MuiTextField: {
            root: {
                backgroundColor: lightGray,
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
        },
        MuiCard: {
            root: {
                '&.MuiPaper-rounded': {
                    borderRadius: '12px',
                    ['@media (max-width: 600px)']: {
                        borderRadius: '0px'
                    }
                },
                marginBottom: '12px'
            }
        },
        MuiCardContent: {
            root: {
                '&:last-child': {
                    paddingBottom: '16px'
                }
            }
        },
        MuiContainer: {
            root: {
                ['@media (max-width: 600px)']: {
                    padding: '0px'
                }
            }
        },
        MuiAlert: {
            root: {
                borderRadius: '12px',
                marginBottom: '5px'
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
