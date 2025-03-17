import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const Button = ({ onClick, children, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-lg text-xl cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
