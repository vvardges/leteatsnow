const Layout = ({ children }) => {
  return (
    <div style={{
      position: 'relative',
      maxWidth: '500px',
      maxHeight: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: '#7dc8e7',
      padding: '20px',
      boxSizing: 'border-box',
      alignItems: 'center'
    }}>
      {children}
    </div>
  );
};

export default Layout;
