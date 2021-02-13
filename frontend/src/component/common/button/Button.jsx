import React from 'react';
import './button.scss';

const Button = ({
    label = "Label",
    className = "",
    type = "button",
    disabled = false,
    name = "name",
    id = "",
    onClick
}) => {
    return (
        <div className={!!disabled ? 'disabled-button button-container' : 'button-container'}>
            <button
                id={id}
                type={type}
                name={name}
                disabled={disabled}
                onClick={onClick}
                className={`btn ${className}`}
            >{label}
            </button>
        </div>
    )
}
export default Button
