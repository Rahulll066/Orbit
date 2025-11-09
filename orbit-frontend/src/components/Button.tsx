import type { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
}

const variantStyles = {
    primary: 'bg-yellow-500 text-white',
    secondary: 'bg-yellow-100 text-yellow-500',
}

const defaultStyles = 'px-4 py-2 rounded-md font-normal flex items-center gap-1  '; 

export function Button({variant, text, startIcon, onClick, fullWidth}: ButtonProps) {
    return <button onClick={onClick} className={variantStyles[variant]+' '+defaultStyles
        +   `${fullWidth ? ' w-full flex justify-center items-center' : ''}`
    }>
        {startIcon}
        {text}
    </button>
}