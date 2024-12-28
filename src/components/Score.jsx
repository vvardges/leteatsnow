import { useAppContext } from '../Context';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 5px;
  font-size: 24px;
  z-index: 10;
  color: white;
`;

const Score = () => {
  const { score } = useAppContext();
  return <Wrapper>Score: {score}</Wrapper>;
};

export default Score;
