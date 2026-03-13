import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-semibold text-text">
        {label}
      </label>
      <input
        className={cn(
          'w-full px-4 py-3 rounded-xl bg-background border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-soft',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
    </div>
  );
};

export default Input;
