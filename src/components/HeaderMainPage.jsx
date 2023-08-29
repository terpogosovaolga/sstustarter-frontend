import logo from '../assets/images/logosstu.png';
import '../assets/style/index.css';
import {Link} from 'react-router-dom';
import Menu from './Menu';
import serverURL from '../serveraddress';
import axios from 'axios';
import React from 'react';
function HeaderMainPage() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [systemInfo, setSystemInfo] = React.useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(serverURL+"systeminfo")
      .then(response => {
          console.log(response.data.info);
          setSystemInfo(response.data.info);
          setIsLoading(false);
    });
}, []); // пустой массив рендерит один раз; если внутри переменная, значит следит за ее изменениями


  return (
        <header className='big' style={{backgroundImage: "url("+serverURL+"uploads/"+systemInfo.header_image+")"}}>
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
                <div className="forsheet">
                  <div className="sheet">
                    {!isLoading && <h1 className="color-blue">{systemInfo.name}</h1> }
                    {!isLoading && <h2>{systemInfo.slogan}</h2> }
                  </div>
                </div>
                <div className="content d-flex justify-content-between flex-column align-items-start">
                {!isLoading && <p>{systemInfo.header_description}</p> }

                  <Link to="/createproject"><div className="create_btn mt-5">Создать проект</div></Link>

                  <div className="count_projects">
                    <span className="number">{systemInfo.project_count}+</span>
                    <span>проектов</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
    );
}



export default HeaderMainPage;