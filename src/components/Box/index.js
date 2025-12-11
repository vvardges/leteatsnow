const Box = ({ children, gap = 1 }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: `${gap}rem`
    }}>
      {children}
    </div>
  );
};

export default Box;
