import type { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    startIcon?: ReactElement;
}

const variantStyles = {
    primary: 'bg-yellow-500 text-white',
    secondary: 'bg-yellow-100 text-yellow-500',
}

const defaultStyles = 'px-4 py-2 rounded-md font-normal flex items-center gap-1  '; 

export function Button({variant, text, startIcon}: ButtonProps) {
    return <button className={variantStyles[variant]+' '+defaultStyles}>
        {startIcon}
        {text}
    </button>
}