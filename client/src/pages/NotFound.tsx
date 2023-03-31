import { ButtonLink, PageContainer, WaveWrapper } from '../components';

const NotFound = () => {
  return (
    <WaveWrapper>
      <PageContainer>
        <div className='not-found'>
          <h1 className='not-found-title'>404</h1>
          <p>You just broke the internet.</p>
          <ButtonLink to='/' text='Go to home page' />
        </div>
      </PageContainer>
    </WaveWrapper>
  );
};

export default NotFound;
