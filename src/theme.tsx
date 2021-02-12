import { createMuiTheme } from '@material-ui/core/styles';

export const black = '#303030';
export const pink = '#ffc0cb';
export const lightGray = '#eee';
// const white = '#f8f5fb';

export const mobileBreak = 650;

const defaultTheme = createMuiTheme();

// Create a theme instance.
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#355c7d'
		}
	},
	typography: {
		h2: {
			color: black,
			fontSize: '2.5rem',
			fontWeight: 900,
			lineHeight: 1
		},
		fontFamily: 'Roboto'
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
				padding: '.75rem',
				margin: '12px 0',
				borderRadius: '8px'
			},
			label: {
				color: black,
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
				backgroundColor: pink,
				'&:hover': {
					backgroundColor: pink
				}
			}
		},
		MuiInputLabel: {
			root: {
				fontFamily: 'Helvetica',
				fontWeight: 600,
				fontSize: 15,
				color: black
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
