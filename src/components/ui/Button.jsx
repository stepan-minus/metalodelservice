const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = 'px-6 py-2 rounded-md transition-colors font-medium';
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 