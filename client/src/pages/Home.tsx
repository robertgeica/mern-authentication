import { PageContainer, WaveWrapper } from "../components";

const Home = () => {
  return (
    <WaveWrapper>
      <PageContainer>
        <h1 className='home-title'>MERN Stack authentication system</h1>
        <p className='home-description'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
          vehicula ante. Nam vulputate velit nec purus consectetur malesuada.
          Nullam convallis eleifend ultrices.
        </p>
      </PageContainer>
    </WaveWrapper>
  );
};

export default Home;
