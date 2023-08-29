import { useRef, useState } from "react"
import serverURL from "../../../serveraddress";
import axios from "axios";
export default function OpenedSetting({setting, closeBlock, setAlert}) {

    const refs = [useRef(), useRef(), useRef(), useRef()];

    const [name, setName] = useState(setting.name);
    const [namePat, setNamePat] = useState("");
    const [slogan, setSlogan] = useState(setting.slogan);
    const [sloganPat, setSloganPat] = useState("");
    const [header_description, setHeader_description] = useState(setting.header_description);
    const [header_descriptionPat, setHeader_descriptionPat] = useState("");
    const [image, setImage] = useState(null);
    const [imagePat, setImagePat] = useState(""); 
    const check = (i, good, bad) => {
        const value = refs[i].current.value;
        let message = "";
        if (i == 0 && value.length < 3) {
            message = "Название - не меньше 3 символов"
        }
        else if (i == 1 && value.length < 5) {
            message = "Слоган - не меньше 5 символов";
        }
        else if (i == 2 && value.length < 15) {
            message = "Описание - не меньше 15 символов";
        }
        else if (i == 3 && !value) {
            message = "Фото не может быть пустым. Мы оставим предыдущую фотографию"
        }
        good(value);
        bad(message);
    }

    const sendData = () => {
        if (!namePat && !sloganPat && !header_descriptionPat) {
            axios.post(serverURL+"systeminfo/edit", {info: {
                id: setting.id,
                name: name, slogan: slogan, header_description: header_description
            }})
            .then(res => {
                console.log(res.data);
                closeBlock(false);
                setAlert("Настройка успешно изменена");
            })
        }
        else {
            console.log('cant send');
        }
    }

    return (
        <div className="background">
            <div className="window" style={{backgroundColor: "white", padding: "2rem"}}>
                <h1>Редактирование</h1>
                <div className="d-flex justify-content-between align-items-stretch">
                    <label>
                        <img className="photo" src={serverURL+"uploads/"+setting.header_image} height="300px"/>
                        <input type="file" ref={refs[3]} style={{display: 'none'}} onChange={() => check(3, setName, setNamePat)} />
                        {imagePat && <span class='color-blue'>{imagePat}</span>}
                    </label>
                    <div style={{width: '50%'}}>
                        <input type="text" name="name" className="form-control big " defaultValue={setting.name} ref={refs[0]} onChange={() => check(0, setName, setNamePat)} placeholder="Название сайта"/>
                        {namePat && <span class='color-blue'>{namePat}</span>}
                        <input type="text" name="slogan" className="form-control big mt-3" defaultValue={setting.slogan} ref={refs[1]} onChange={() => check(1, setSlogan, setSloganPat)} placeholder="Слоган сайта" />
                        
                        {sloganPat && <span class='color-blue'>{sloganPat}</span>}
                        <textarea name="header_description" className="form-control big mt-3" defaultValue={setting.header_description} ref={refs[2]}  onChange={() => check(2, setHeader_description, setHeader_descriptionPat)} placeholder="Описание" ></textarea>
                        
                        {header_descriptionPat && <span class='color-blue'>{header_descriptionPat}</span>}
                        <div className="for_btn d-flex justify-content-end align-items-stretch mt-5">
                            <div className="ready" onClick={sendData}>Готово</div>
                            <div className="cancel ml-2rem" onClick={() => closeBlock(false)}>Отмена</div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}