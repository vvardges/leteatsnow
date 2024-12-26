import {useGetDimensions} from '../hooks/useGetDimensins';

const Layout = ({children}) => {
    const { width, height } = useGetDimensions();
  return (
      <div style={{position: 'relative', width, height, fontSize: '33px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#3c7eab'}}>
          {children}
      </div>
  );
};

export default Layout;
