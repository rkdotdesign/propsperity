import React from 'react';
import './Button.css';

function Button({ label, variant, size, disabled, onClick }) {
  return (
    <button
      className={`propsperity-btn propsperity-btn--${variant} propsperity-btn--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false,
};

export default Button;