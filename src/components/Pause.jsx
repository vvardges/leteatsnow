import { useAppContext } from '../Context';
import { styled } from 'styled-components';
import Button from './Button';
import { useNavigate } from 'react-router';
import Box from './Box';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: white;
  width: 310px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
  text-align: center;
  padding: 60px;
  box-sizing: border-box;
`;

const Pause = () => {
  const { score, onResume } = useAppContext();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Box>
        <h2>Your Score: {score}</h2>
        <Button onClick={onResume}>Resume</Button>
        <Button onClick={() => navigate('/')}>Home</Button>
      </Box>
    </Wrapper>
  );
};

export default Pause;
