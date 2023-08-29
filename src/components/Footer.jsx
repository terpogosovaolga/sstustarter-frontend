import {Link} from 'react-router-dom';
import '../assets/style/general.css';
import logo from '../assets/images/logosstu.png';
import React from 'react';
import axios from 'axios';
import serverURL from '../serveraddress';

function Footer() {

    const [links, setLinks] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        axios
            .get(serverURL+"netsicons/notarchive")
            .then(response => {
                setLinks(response.data.icons);
                setIsLoading(false);
            });
    }, []); // пустой массив рендерит один раз; если внутри переменная, значит следит за ее изменениями


    return (<footer>
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <img className="logo" src={logo} alt="" />
                </div>
                <div className="col-12 col-md-4 d-flex flex-column">
                    <Link to="/">ГЛАВНАЯ</Link>
                    <Link to="/catalog">ПРОЕКТЫ</Link>
                    <Link to="/com">СОТРУДНИЧЕСТВО</Link>
                </div>
                <div className="col-12 col-md-4">
                    <h5>СГТУ в медиа</h5>
                    {!isLoading && <div className="media d-flex justify-content-start align-items-stretch">
                        {
                            links.map((icon) => 
                            <a href={icon.link} key={icon.id}>
                                <img src={serverURL+"uploads/"+icon.path} alt={icon.name} />
                            </a>
                            )
                        }
                    </div>}
                </div>
            </div>
        </div>
    </footer>);
}

export default Footer;