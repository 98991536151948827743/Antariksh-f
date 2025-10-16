import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  icon, 
  onClick, 
  className = '',
  text,
  redirectTo,
  ...props 
}) => {
  const navigate = useNavigate();

  const variants = {
    primary: 'bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:shadow-xl',
    secondary: 'bg-blue-500/20 backdrop-blur-md border border-blue-400/50 text-blue-100 hover:bg-blue-500/30 hover:shadow-xl',
    outline: 'bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:shadow-xl',
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (redirectTo) navigate(redirectTo);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        px-8 py-3 rounded-full font-medium text-sm md:text-base
        transition-all duration-300 
        flex items-center space-x-2 justify-center
        shadow-lg
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {text && <span>{text}</span>}
      {children && <span>{children}</span>}
      {icon && (
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Button;