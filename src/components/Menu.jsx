
import userlogo from '../assets/images/icons/user_white.svg';
import logout_pic from '../assets/images/icons/logout.svg';
import {useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
function Menu() {
  console.log('rerender menu');
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuth);
    const username = useSelector(state => state.auth.username);
    const userId = useSelector(state => state.auth.userId);
    

    const logout_ = () => {
      dispatch(logout());
      localStorage.setItem('isAuth', false);
      localStorage.setItem('username', null);
      localStorage.setItem('userId', null);

      navigate("/login");
    }

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Главная {"   "}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog">
                    Проекты {"   "}
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/com" >Сотрудничество {"   "}</NavLink>
                </li> */}

                { !isAuth && 
                    <li className="nav-item">
                    <NavLink  className="nav-link"  to="/login">
                        Вход | Регистрация {"   "}
                    </NavLink>
                    </li>
                }
                { isAuth &&  <>
                <li className="nav-item">
                  
                  <NavLink  className="nav-link"  to={"/profile/"+userId}>
                  <img src={userlogo} alt="" /> {username + "   "}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span  className="nav-link" onClick={logout_}>
                  <img src={logout_pic} alt="" />
                  </span>
                </li></>
                }
              </ul>
    );
}

export default Menu;