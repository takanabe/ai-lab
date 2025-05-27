import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonProps = MuiButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton variant="contained" color="primary" {...props} />;
};

export default Button;
