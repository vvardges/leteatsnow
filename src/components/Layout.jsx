'use client';

import { styled } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: 500px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #7dc8e7;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
`;

const Layout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
