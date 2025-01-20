import { styled } from 'styled-components';

const Wrapper = styled.input`
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 20px;
  font-family: 'Orbitron', serif;
  font-weight: bold;
  box-shadow: 0 4px 0 #6d9ac3;
  outline: none;
`;

const Input = (props) => {
  return <Wrapper {...props} />;
};

export default Input;
