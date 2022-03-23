import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    background: {
      default: '#eee'
    }
  },
  breakpoints: {
    values: { xs: 0, sm: 480, md: 900, lg: 1200, xl: 1536 }
  }
});

theme = createTheme(theme, {
  palette: {
    background: {
      default: theme.palette.grey[200]
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: theme.typography.fontSize,
          '& h1,h2,h3,h4,h5.h6': {
            fontWeight: theme.typography.fontWeightLight
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '6px 12px',
          whiteSpace: 'nowrap'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#eee'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined'
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary'
      }
    }
  }
});

export default theme;
