import React from "react";
import FirstRegisterBlock from "./FirstRegisterBlock";
import SecondRegisterBlock from "./SecondRegisterBlock";
import axios from "axios";
import serverURL from "../../serveraddress";
export default function RegisterBlock({setSection, setMessage}) {

    const [registerStep, setRegisterStep] = React.useState(0);
    const [newUser, setNewUser] = React.useState({});
    const [isReady, setIsReady] = React.useState(false);

    const [url, setUrl] = React.useState('');
 
    React.useEffect(() => {
        if (isReady === true) {
            try {
                var formData = new FormData();
                
                if (newUser.avatar_file) {
                    formData.append("image", newUser.avatar_file);
                    console.log('appending file!!!! register');
                    console.log(newUser.avatar_file);
                    axios
                    .post(serverURL+"upload", formData)
                    .then(response => {
                    if (response.data.success) {
                        setUrl(response.data.url);
                    }
                    });
                }
                else {
                    setUrl(null);
                }
                newUser.role_id = 0;
                newUser.patronymic = newUser.lastname;
                newUser.structure_id = newUser.structure.id;
                axios
                    .post(serverURL+"auth/register", JSON.stringify(newUser))
                    .then(response => {
                    if (response.data.success) {
                        console.log(response.data);
                    }
                    });
                
            }
            catch (err) {
                console.warn(err);
            }
        }
    }, [isReady]);

    React.useEffect(() => {
        if (isReady) {
            axios.post(serverURL+"auth/register", {
                role_id: 1,
                name: newUser.name,
                surname: newUser.surname,
                patronymic: newUser.lastname ? newUser.lastname : null,
                birth: newUser.birth ? newUser.birth : null,
                structure_id: newUser.structure.id,
                job: newUser.job,
                avatar_path: url,
                login: newUser.login,
                password: newUser.password
            }).then(res => {
                console.log(res.data);
                if (res.data.success) {
                    setSection('login');
                    setMessage(true);
                }
            });
        }
    }, [url]);

    return (
        <div className="content flex-column align-items-start" style={{marginTop: "10vh"}} id="register">
            <h1>Регистрация</h1>
            <span className="color-blue fw-bolder" onClick={() => setRegisterStep(registerStep == 0 ? 1 : 0 )}>{registerStep + 1}</span> из <span>2</span>
            {registerStep == 0 && < FirstRegisterBlock oncl = {(i)=>setRegisterStep(i)} user={newUser} change={setNewUser} />}
            {registerStep == 1 && < SecondRegisterBlock user={newUser} change={setNewUser} onReady={() => setIsReady(true)}/> }
            <div style={{marginTop: "1.5rem"}}><a className="color-blue mt-3" onClick={() => setSection('login')}>Вход</a></div>
        </div>
    );
}