import { useAppContext } from '../Context';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  font-size: 24px;
  z-index: 10;
  color: white;
`;

const Lives = () => {
  const { lives } = useAppContext();
  return <Wrapper>Lives: {lives}</Wrapper>;
};

export default Lives;
