interface PageContainerProps {
  children: any;
}
const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className='page-container'>
      {children}
    </div>
  );
};

export default PageContainer;
