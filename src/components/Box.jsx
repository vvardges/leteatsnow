'use client';

import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => `${props.gap}rem`};
`;

const Box = ({ children, gap = 1 }) => {
  return <Wrapper gap={gap}>{children}</Wrapper>;
};

export default Box;
