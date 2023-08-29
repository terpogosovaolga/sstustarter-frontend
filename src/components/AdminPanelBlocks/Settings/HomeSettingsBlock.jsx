import { useEffect, useState } from "react";
import HomeSettingTr from "./HomeSettingTr";
import axios from "axios";
import serverURL from "../../../serveraddress";
import AddSetting from './AddSetting';
export default function HomeSettingsBlock() {

    const [settings, setSettings] = useState([]);

    const [update, setUpdate] = useState(false);
    useEffect(() => {
        console.log('eff');
        axios.get(serverURL+"systeminfo/all")
        .then(res => {
            console.log(res.data);
            if (res.data.success) {
                setSettings(res.data.infos);
            }
        })
    }, [update]);

    const [isOpenAdd, setIsOpenAdd] = useState(false);

    return (
        <div className="main-settings mt-5">
            <div class='for_btn d-flex justify-content-end'>
                <div class='adduser' onClick={() => setIsOpenAdd(true)}>
                    Добавить настройку
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Активность</th>
                        <th>№</th>
                        <th>Фото</th>
                        <th>Название сайта</th>
                        <th>Слоган</th>
                        <th>Описание</th>
                        <th>Дата добавления</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        settings.map((s, i) => <HomeSettingTr key={s.id} setting={s} index={i}  added={() => setUpdate(true)}/>)
                    }
                    
                </tbody>
            </table>

            {
                isOpenAdd &&
                    <AddSetting closeBlock={setIsOpenAdd}/>
            }
        </div>
    );
}