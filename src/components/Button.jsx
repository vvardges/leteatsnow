const Button = ({ children, onClick, disabled, ...props }) => {
  return (
    <button
      style={{
        backgroundColor: disabled ? '#eee' : '#00622d',
        color: 'white',
        border: 'none',
        padding: '15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '20px',
        fontFamily: 'Orbitron, serif',
        fontWeight: 'bold',
        width: '186px',
        boxShadow: '0 4px 0 #6d9ac3'
      }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
