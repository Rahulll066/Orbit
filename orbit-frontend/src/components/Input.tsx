import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", className, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          className={
            "px-4 py-2 border rounded-sm m-2 w-full " +
            (className ? className : "")
          }
          {...rest}
        />
      </div>
    );
  }
);
