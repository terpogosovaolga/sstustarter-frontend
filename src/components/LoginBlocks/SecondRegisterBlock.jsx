import React, {useState, useRef} from "react";
import serverURL from '../../serveraddress';
import axios from 'axios';

function SecondRegisterBlock({user, change, onReady}) {

    const [structures, setStructures] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        axios
          .get(serverURL+"structures")
          .then(response => {
              setStructures(response.data.structures);
              setIsLoading(false);
        });
    }, []);

    // для контроля инпутов 
    const [job, setJob] = useState(user.job ? user.job : "");
        // строковая
    const [structure, setStructure] = useState(user.structure ? user.structure : '');
    const [structureId, setStructureId] = useState(null);
    const [avatar, setAvatar] = useState(user.avatar ? user.avatar : "");
    const [birth, setBirth] = useState(user.birth ? user.birth : "");
    // для отслеживания корректности вводимых данных
    const [jobPat, setJobPat] = useState('Обязательное поле');
    const [structurePat, setStructurePat] = useState('Выберите из списка');
    const [avatarPat, setAvatarPat] = useState('');
    const [birthPat, setBirthPat] = useState('');
    // ссылки для инпутов
    let refs = [useRef(), useRef(), useRef(), useRef()];

    const check = (str, i) =>  {
        switch (i) {
            case 0: //job
                return (/^([-А-Яа-яЁё ]{1,})$/.test(str) && str.trim().length !== 0 ? [true, setJobPat, setJob] : ["Обязательное поле. Русские буквы, дефис, пробелы", setJobPat, setJob]);
            case 2:  //avatar
                if (!str) {
                    return [true, setAvatarPat, setAvatar]; // пустой файл - это ок 
                }
                if (!"image/jpeg,image/png,image/gif".includes(str.type)) {
                    return ["Только изображения", setAvatarPat, setAvatar];
                }
                return [true, setAvatarPat, setAvatar]; // пустой файл - это ок   
            case 3:  // birth
                let date = new Date(str);
                let now = new Date(); // this moment
                // let dif = date - now; 
                let dif = now.getFullYear() - date.getFullYear();

                if (dif >= 100 || dif < 0) {
                    return ["Вы ошиблись", setBirthPat, setBirth];
                }
                else if (dif <= 14) {
                    return ["Вам должно быть минимум 14 лет", setBirthPat, setBirth];
                }
                
                else {
                    return [true, setBirthPat, setBirth];
                };
            default: return [true, null, null];
        }
    }

    const searchIdOfStructure = (s) => {
        for (const str of structures) {
            if (str.abbreviation == s || str.decoding == s) {
                return str.id;
            }
        }
        return false;
    }

    const editUser = (event, field) => {
        if (field == 1) {
            let res = searchIdOfStructure(event.target.value);
            if (res) {
                setStructureId(res);
                setStructurePat('');
                setStructure(event.target.value);
            } else {
                setStructureId(null);
                setStructurePat("Обязательное поле. Выберите из списка");
                setStructure(event.target.value);
            }
        }
        else if (field == 2) {
            let file = refs[2].current.files[0];
            let file2 = event.target.files[0];
            let [b, m1, m2] = check(file, 2);
            if (b === true) {
                m1('');
                m2(file); // сохраняем в переменную avatar
            }
            else {
                m1(b);
                m2("");
            }
        }
       // b - true или сообщение, m1 - метод для namePat, m2 - метод для стейта
       else {
            let [b, m1, m2] = check(event.target.value, field);
            if (b === true) {
                
                if (m1) m1(''); // у avatar m1 нет
            } else {
                m1(b);
            }
            m2(event.target.value);
        }
    }


    const register = () => {
        if (structureId && !jobPat && !birthPat && !avatarPat) {
            let user_ = user;
            user_.structure = {
                id: structureId,
                name: structure
            };
            user_.avatar_file = avatar ? avatar : null;
            user_.birth = birth;
            user_.job = job;
            change(user_);
            onReady();
        } else {
        }
    }

    return (
        <form action="" encType="mulipart/data">
            <input type="text" name="job" value={job} className="form-control big" placeholder="Должность (студент, преподаватель...)" required onChange={(event) => editUser(event, 0)} ref={refs[0]}/>
            <span className="color-blue">{jobPat+" "}</span>
            <input list="structure"  className='form-control big' id="structure-choice" name="structure-choice" placeholder="Структурное подразделение" required  onChange={(event) => editUser(event, 1)} ref={refs[1]} value={structure} />

            {!isLoading && <datalist name="structure" value={structure}  className="form-control big" id="structure" style={{display: "none"}} >
                {
                    structures.map((str, i) => {
                        return <option value={str.abbreviation ? str.abbreviation : str.decoding} key={str.id}> </option>
                    })
                }
            </datalist>}
            
            <span className="color-blue">{structurePat+" "}</span> { structurePat ? <br /> : ""}
            <label htmlFor="avatar" style={{marginTop: "2rem"}}>Выберите аватар</label> 
            <input className="form-control big" style={{marginTop: "10px"}}  type="file" id="avatar" name="avatar"  ref={refs[2]}   onChange={(event) => editUser(event, 2)}/>
            <span className="color-blue">{avatarPat + " "}</span> { avatarPat ? <br /> : ""}
            <label htmlFor="birth" style={{marginTop: "2rem"}} >Дата рождения</label>
            <input className="form-control big" style={{marginTop: "10px"}}  type="date" id="birth" name="birth" value={birth}  ref={refs[3]}  onChange={(event) => editUser(event, 3)}/>
            <span className="color-blue">{birthPat+" "}</span>
            
            <div className="create_btn" onClick={() => register()}>Регистрация</div>
        </form>
    );
}

export default SecondRegisterBlock;