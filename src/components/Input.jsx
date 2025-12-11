const Input = (props) => {
  return (
    <input
      style={{
        border: 'none',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '20px',
        fontFamily: 'Orbitron, serif',
        fontWeight: 'bold',
        boxShadow: '0 4px 0 #6d9ac3',
        outline: 'none'
      }}
      {...props}
    />
  );
};

export default Input;
