import { useRef, useState } from 'react';

function FirstRegisterBlock({oncl, user, change}) {
    // для контроля инпутов 
    const [surname, setSurname] = useState(user.surname ? user.surname : "");
    const [name, setName] = useState(user.name ? user.name : "");
    const [lastname, setLastname] = useState(user.lastname ? user.lastname : "");
    const [login, setLogin] = useState(user.login ? user.login : "");
    const [password, setPassword] = useState(user.password ? user.password : "");
    // для отслеживания корректности вводимых данных
    const [surnamePat, setSurnamePat] = useState('Обязательное поле');
    const [namePat, setNamePat] = useState('Обязательное поле');
    const [lastnamePat, setLastnamePat] = useState('');
    const [loginPat, setLoginPat] = useState('Обязательное поле');
    const [passwordPat, setPasswordPat] = useState('Обязательное поле');
    // ссылки для инпутов
    let refs = [useRef(), useRef(), useRef(), useRef(), useRef()];
    // let fields = ['surname', 'name', 'lastname', 'login', 'password'];

    // проверка на корректность. вызывается внутри editUser
    const check = (str, i) =>  {
        switch (i) {
            case 0: //surname
                return (/^([-А-Яа-яЁё]{1,})$/.test(str) && str.trim().length !== 0 ? [true, setSurnamePat, setSurname] : ["Обязательное поле. Русские буквы или дефис", setSurnamePat, setSurname]);
            case 1:  //name
                return (/^([-А-Яа-яЁё]{1,})$/.test(str) && str.trim().length !== 0 ? [true, setNamePat, setName] : ["Обязательное поле. Русские буквы или дефис", setNamePat, setName]);
            case 2:  //lastname
            return (/^([-А-Яа-яЁё]{0,})$/.test(str) ? [true, setLastnamePat, setLastname] : ["Русские буквы или дефис", setLastnamePat, setLastname]);
            case 3:  // login
                return (/^([A-Za-z0-9_]{4,})$/.test(str) && str.trim().length !== 0 ? [true, setLoginPat, setLogin] : ["Обязательное поле. Минимум 5 символов", setLoginPat, setLogin]);
            case 4:  // password
                return str.length > 5 ? [true, setPasswordPat, setPassword] : ["Обязательное поле. Минимум одна цифра или буква. Минимум 6 символов", setPasswordPat, setPassword];
            default: return [true, null];
        }
    }

    // onChange на инпутах (на каждом)
    const editUser = (event, field) => {
        // b - true или сообщение, m1 - метод для namePat, m2 - метод для стейта
        let [b, m1, m2] = check(event.target.value, field);
        if (b === true) {
            m1('');
        } else {
            m1(b);
        }
        m2(event.target.value);
    }

    // если все верно, то идем в second, если нет то нет
    const tryOncl = (i) => {
        if (!surnamePat && !namePat && !lastnamePat && !loginPat && !passwordPat) {
            let user_ = user;
            user_.name = name;
            user_.surname = surname;
            user_.lastname = lastname;
            user_.login = login;
            user_.password = password;

            change(user_);

            oncl(i);
        }
    }
    return (
        <form action="">
            <input type="text" name="surname" ref={refs[0]} className="form-control big" placeholder="Фамилия" value={surname} onChange={(event) => {editUser(event, 0)}} required />
            <span className="color-blue">{surnamePat+" "}</span>
            <input type="text" name="name" ref={refs[1]}  className="form-control big" placeholder="Имя" value={name} onChange={(event) => {editUser(event, 1)}} required />
            <span className="color-blue">{namePat+" "}</span>
            <input type="text" name="lastname" ref={refs[2]}  className="form-control big" placeholder="Отчество" value={lastname} onChange={(event) => {editUser(event, 2)}} />
            <span className="color-blue">{lastnamePat+" "}</span>
            <input type="text" name="login" ref={refs[3]}  className="form-control big" placeholder="Логин" value={login} onChange={(event) => {editUser(event, 3)}}  required  />
            <span className="color-blue">{loginPat+" "}</span>
            <input type="password" name="password" ref={refs[4]}  className="form-control big" placeholder="Пароль" value={password} onChange={(event) => {editUser(event, 4)}}  required />
            <span className="color-blue">{passwordPat+" "}</span> <br />

            <div className="create_btn" onClick={() => tryOncl(1)}>Регистрация</div>
        </form>
    );
}

export default FirstRegisterBlock;