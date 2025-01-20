import { styled } from 'styled-components';

const Wrapper = styled.button`
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

  &:disabled {
    background-color: #eee;
  }
`;

const Button = ({ children, onClick, ...props }) => {
  return (
    <Wrapper onClick={onClick} {...props}>
      {children}
    </Wrapper>
  );
};

export default Button;
