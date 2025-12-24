import type { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
}

const variantStyles = {
    primary: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    secondary: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-500',
}

const defaultStyles = 'px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md font-normal flex items-center gap-1 transition-colors whitespace-nowrap'; 

export function Button({variant, text, startIcon, onClick, fullWidth}: ButtonProps) {
    return <button onClick={onClick} className={variantStyles[variant]+' '+defaultStyles
        +   `${fullWidth ? ' w-full flex justify-center items-center' : ''}`
    }>
        {startIcon}
        {text}
    </button>
}