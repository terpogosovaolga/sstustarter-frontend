import logo from '../assets/images/logosstu.png';

import Menu from './Menu';

function Header() {

  return (
    <header className="blue">
        <div className="menu">
            <nav className="navbar navbar-expand-lg">
                <div className="container d-flex justify-content-between">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{flexGrow: 0}}>
                        < Menu />
                    </div>
                </div>
            </nav>
        </div>
    </header>
  );
}

export default Header;