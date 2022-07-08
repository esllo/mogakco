import Github from '@/components/Svg/github';
import styled from '@emotion/styled';

const Mogakco = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const MogakcoText = styled.h1`
  font-size: 4rem;
  color: white;
`;

const Home = () => {
  return (
    <Mogakco>
      <MogakcoText>모각코봇</MogakcoText>
      <Github style={{ width: '60px' }} />
    </Mogakco>
  );
};

export default Home;
