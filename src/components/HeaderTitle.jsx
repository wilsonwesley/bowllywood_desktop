const Header = ({children}) => {

  return (
    <header className="d-flex flex-column align-items-center justify-content-center mb-5">
      <img src='/bowllywood.png' className="App-logo" alt="logo" />
      <h2 className="m-0">{children}</h2>
    </header>
  );
}

export default Header;