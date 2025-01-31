'use client';

import { styled } from 'styled-components';
import Link from 'next/link';

const Wrapper = styled(Link)`
  background-color: #00622d;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-family: 'Orbitron', serif;
  font-weight: bold;
  width: 186px;
  box-shadow: 0 4px 0 #6d9ac3;
  text-decoration: none;
  text-align: center;

  &:disabled {
    background-color: #eee;
  }
`;

const Button = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Button;
