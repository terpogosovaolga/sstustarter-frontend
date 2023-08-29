import React from 'react';
import LoginBlock from "../components/LoginBlocks/LoginBlock";
import RegisterBlock from "../components/LoginBlocks/RegisterBlock";
import Menu from "../components/Menu";
import logo from '../assets/images/logosstu.png';
import '../assets/style/projects.css';
import '../assets/style/index.css';


function Login({login_section}) {
    const [section, setSection] = React.useState(login_section);
    const [message, setMessage] = React.useState(false);

    return (
            <header className='big'>
                <div className="menu">
                    <nav className="navbar navbar-expand-lg">
                    <div className="container d-flex justify-content-between">
                        <a className="navbar-brand" href="https://sstu.ru/">
                        <img src={logo} alt="" />
                        </a>
                        <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                        style={{flexGrow: 0}}
                        >
                        <Menu />
                        </div>
                    </div>
                    </nav>
                </div>
                <div className="container">
                    <div className="row h100">
                        <div className="left h100 col-6"></div>
                        <div className="right col-6">
                            {section == "login" && <LoginBlock message={message} setSection={setSection} />}
                            
                            {section == 'register' && <RegisterBlock setSection={setSection}  setMessage={setMessage}/>}
                        </div>
                    </div>
                </div>
            </header>
    );
}

export default Login;