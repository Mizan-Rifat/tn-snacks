import { alpha } from '@mui/material/styles';

export const colors = ['primary', 'warning', 'error', 'success', 'info'];
export const primaryColor = ['#9c27b0', '#ab47bc', '#8e24aa', '#af2cc5'];
export const warningColor = ['#ff9800', '#ffa726', '#fb8c00', '#ffa21a'];
export const errorColor = ['#f44336', '#ef5350', '#e53935', '#f55a4e'];
export const successColor = ['#4caf50', '#66bb6a', '#43a047', '#5cb860'];
export const infoColor = ['#00acc1', '#26c6da', '#00acc1', '#00d3ee'];
export const blackColor = '#000';
export const whiteColor = '#fff';

export const primaryBoxShadow = `0 4px 20px 0 ${alpha(
  blackColor,
  0.14
)}, 0 7px 10px -5px ${alpha(primaryColor[0], 0.4)}`;
export const warningBoxShadow = `0 4px 20px 0 ${alpha(
  blackColor,
  0.14
)}, 0 7px 10px -5px ${alpha(warningColor[0], 0.4)}`;
export const errorBoxShadow = `0 4px 20px 0 ${alpha(
  blackColor,
  0.14
)}, 0 7px 10px -5px ${alpha(errorColor[0], 0.4)}`;
export const successBoxShadow = `0 4px 20px 0 ${alpha(
  blackColor,
  0.14
)}, 0 7px 10px -5px ${alpha(successColor[0], 0.4)}`;
export const infoBoxShadow = `0 4px 20px 0 ${alpha(
  blackColor,
  0.14
)}, 0 7px 10px -5px ${alpha(infoColor[0], 0.4)}`;
