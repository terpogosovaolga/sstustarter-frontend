import edit from '../../assets/images/icons/edit.svg';
import structure from '../../assets/images/icons/briefcase.svg';
import { useEffect, useRef, useState } from 'react';
import serverURL from '../../serveraddress';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ProfileContext } from '../../pages/Profile';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';
function UserBlock() {
    const userId = useSelector(state => state.auth.userId);
    const isAuth = useSelector(state => state.auth.isAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [isEdittingData, setIsEdittingData] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [message, setMessage] = useState("");
    const [isGoodMessage, setIsGoodMessage] = useState(false);

    const { profileId } = useContext(ProfileContext);


    useEffect(() => {
        if (isAuth) {
            axios.get(serverURL+'auth/me', {params : {userId: profileId}}).then(res => {
            if (res.data.success === false) {
                console.log(res.data.message);
                setIsLoading(false);
            } else {
                console.log('else');
                setUser(res.data.user);
                setAvatar(res.data.user.avatar_path ? res.data.user.avatar_path : "defaultuser.svg");
                setIsLoading(false);
            }
        });
        }
        
    }, []);


    const file_ref = useRef();
    const updateImage = () => {
        console.log(file_ref.current.files[0]);
        var formData = new FormData();
        if (file_ref.current.files[0]) {
            formData.append("image", file_ref.current.files[0]);
            axios
            .post(serverURL+"upload", formData)
            .then(response => {
            if (response.data.success) {
                console.log('uploaded ' + response.data.url);
                axios.post(serverURL + "user/editAvatar/"+userId, {url: response.data.url})
                .then(response => {
                    if (response.data.success === false) {
                        console.log(response.data.message);
                    }
                    else {
                        setAvatar(response.data.url);
                        setMessage("Фото успешно обновлено");
                        setIsGoodMessage(true);
                    }
                });
            }
            else {
                console.log('error')
            }
            });
        }
    }
    
    const editData = () => {
        console.log('edit')
    }

    console.log(user);

    if (user.id && !isLoading) {
        return (
            <section className="profile toggle">
                {message && <div className="alert">
                    {message}
                    {
                        isGoodMessage && 
                        <span onClick={() => setMessage("")}>x</span>
                    }
                </div>}
                <div className="row">
                    <div className="col-12 col-md-3 forpic">
                        <div className="pic"  style={{position: "relative", backgroundImage: "url(" + serverURL+"uploads/"+(avatar ? avatar : "defaultuser.svg") + ")"}}>
                            {profileId === userId && <div className="edit editpic">
                                <label>
                                    <img src={edit} alt="" />
                                    <input type="file" style={{display: "none"}} onChange={updateImage} ref={file_ref} />
                                </label>
                               
                            </div>}
                        </div>
                    </div>
                    <div className="col-12 col-md-9 info" style={{position: "relative"}}>
                        <h2>
    
                            {(!isEdittingData || profileId !== userId)  && (user.surname + " " + user.name +  (user.patronymic ? " "+user.patronymic : "") )}
                            {isEdittingData && profileId===userId && <>
                                <input type='text' className='width30' value={user.surname} name="surname"/>
                                <input type='text' className='width30' value={user.name} name="name"/>
                                <input type='text' className='width30' value={user.patronymic} name="patr"/></>
                            }
                            </h2>
                        <div className="jobs d-flex justify-content-start align-items-center">
                            
                                <div className="job d-flex align-items-center">
                                    <img src={structure} alt="" />
                                    <span className="ml-1rem">
                                        {(!isEdittingData || profileId !== userId) && user.job}
                                        {isEdittingData && profileId===userId && <input style={{marginTop: "0rem"}} type='text'value={user.job} name="job"/>}
                                        </span>
                                </div>
                           
                            {user.structure && 
                                <div className="place ml-2rem">Подразделение: {(!isEdittingData || profileId !== userId) && (user.structure[0].abbreviation ? user.structure[0].abbreviation : user.structure[0].decoding) }
                                {isEdittingData && profileId===userId && <input style={{marginTop: "0rem"}} type='text' value={user.structure[0].abbreviation} name="structure"/>}
                                </div> 
                            }
                        </div>
                        {(!isEdittingData || profileId !== userId) && <div className="statistics d-flex justify-content-start align-items-center">
                            <div className="one_st count_projects">
                                <span className="number">{user.creatorProjectsCount}</span>
                                <span>собственных <br /> проектов</span>
                            </div>
                            <div className="one_st count_projects ml-2rem">
                                <span className="number">{user.memberProjectsCount}</span>
                                <span>задействованных <br /> проектов</span>
                            </div>
                        </div>}
    
                        {
                            isEdittingData && profileId===userId && 
                            <div className="buttons">
                                <div className="ready" onClick={editData}>Готово</div>
                                <div className="cancel" onClick={() => setIsEdittingData(false)}>Отмена</div>
                            </div>
                        }
    
                        {profileId === userId && <div className="edit editinfo" onClick={() => setIsEdittingData(!isEdittingData)}>
                            <img src={edit} alt="" />
                        </div>}
                    </div>
                </div>
            </section>
        ); 
    }
    else if (isLoading) {
        return <h1>Загрузка страницы...</h1>
    }
    else {
        return <h1>Страница не найдена</h1>
    }
    
}

export default UserBlock;