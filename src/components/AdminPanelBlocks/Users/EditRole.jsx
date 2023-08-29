import axios from "axios";
import { useRef, useState } from "react";
import serverURL from '../../../serveraddress';

export default function EditRole({user, closeFunc, saveFunc}) {

    const ref = useRef();

    const saveChanges = () => {
        axios.post(serverURL+"user/editRole", {id: user.id, role_id: ref.current.value})
        .then(res => {
            if (res.data.success) {
                console.log('ok');
                closeFunc();
                saveFunc();
            }
            else {
                console.log(res.data);
            }
        })
    }

    return (
        <div className="background">
            <div className="window">
                <h3>{user.surname + " " + user.name + " " + (user.patronymic ? user.patronymic : "")}</h3>
                <p style={{marginBottom: 0}}>Изменение роли</p>
                <div className="d-flex justify-content-end align-items-center">
                    <select className='form-select big' name="role" ref={ref} defaultValue={user.role_id}>
                        <option value="1">Пользователь</option>
                        <option value="2">Администратор</option>
                        <option value="3">Модератор</option>
                    </select>
                    <div className="ml-1rem d-flex align-items-center">
                        <div className="save" onClick={saveChanges}>Сохранить</div>
                        <div className="cancel" onClick={closeFunc}>Отмена</div>
                    </div>
                </div>
            </div>
        </div>
    );
}