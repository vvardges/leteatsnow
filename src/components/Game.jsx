import { styled } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

const Game = ({ children, width, height }) => {
  return (
    <Wrapper width={width} height={height}>
      {children}
    </Wrapper>
  );
};

export default Game;
