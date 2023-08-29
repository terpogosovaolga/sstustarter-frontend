import { useDispatch, useSelector } from "react-redux";
import { setStep,
    setName,
    setTheme,
    setIdea,
    setNamePat,
    setThemePat,
    setIdeaPat } from "../../redux/slices/creationSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import serverURL from "../../serveraddress";

function LevelOne() {

    const dispatch = useDispatch();
    const elems1 = useSelector(state => state.creation.elems1);
    const [themes, setThemes] = useState([]);
    const refs = [useRef(), useRef(), useRef()];

    const [selectedTheme, setSelectedTheme] = useState(0);

    const check = (index, method, pat_method) => {
        const value = refs[index].current.value;
        let mistake = "";
        if (index == 0 && value.length < 5) {
            mistake = "Минимальная длина - 5 символов";
        }
        else if (index == 2 && (value.length < 50 || value.length > 1000)) {
            mistake = "Рекомендуемая длина - 100-500 символов. Минимальная - 50, максимальная - 1000";
        }
        
        if (mistake) {
            dispatch(pat_method(mistake));
        }
        else {
            dispatch(pat_method(""));
        }
        dispatch(method(value));
    }


    useEffect(() => {
        axios.get(serverURL + "themes/all")
        .then(response => {
            if (response.data.success) {
                setThemes(response.data.themes)
            }
        });
    }, []);

    const findTheme = () => {
        let str = refs[1].current.value;
        setSelectedTheme(str);
        let theme = themes.filter((t) => t.name == str)[0];
        if (theme) {
            dispatch(setTheme(theme.id));
            dispatch(setThemePat(""));
        }
        else {
            dispatch(setTheme(0));
            dispatch(setThemePat("Выберите тему проекта"));
        }
    }

    const getThemeName = (id) => {
        if (id != 0) {
            let ths = themes.filter(t => t.id == id)[0];
            if (ths) {
                return ths.name;
            }
            else {console.log('mis 1'); return "Выберите тему"}
        }
        else {console.log('mis 2'); return "Выберите тему"}
    }

    useEffect(() => {
        setSelectedTheme(getThemeName(elems1.theme));
    }, [themes]);

    const tryNext = () => {
        if (!elems1.themePat && !elems1.namePat && !elems1.ideaPat)
            dispatch(setStep(2))
    }


    return (
        <>
        <div className="for_form">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="mt-5" style={{width: '46%'}}>
                        <label htmlFor="name">Название проекта</label>
                        <input type="text" className="form-control big white" name="name" placeholder="Концертная программа для работников пожарных станций, разработка информационной системы для студентов-медиков и так далее" ref={refs[0]} onChange={() => {check(0, setName, setNamePat)}} value={elems1.name} required/>
                        { elems1.namePat != "" && <span className="color-blue">{elems1.namePat}</span>}
                    </div>
                    {
                        themes && <div className="mt-5" style={{width: '46%'}}>
                        <label htmlFor="theme">Выберите тему проекта</label>
                        
                        <input list="theme"  className='form-control big white' id="theme-choice" name="theme-choice" placeholder="Тема"  ref={refs[1]} onChange={() => findTheme()}  value={selectedTheme} />
                        <datalist name="theme" className="form-control big white" id="theme" style={{display: "none"}} >
                            {/* <option value="Выберите тему"></option> */}
                            {
                                themes.map(t => <option key={t.id} value={t.name}></option>)
                            }
                        </datalist>
                        { elems1.themePat != "" && <span className="color-blue">{elems1.themePat}</span>}
                    </div>
                    }
                    
                </div>
                <div className="mt-5">
                    <label htmlFor="idea">Опишите идею проекта</label>
                    <textarea name="idea_text" className="form-control big white" placeholder="Планируется к разработке информационная система, помогающая студентам-медикам проходить обучение практическим навыкам. Система позволит избежать неоправданных рисков на ранних этапах обучения специалистов... "  ref={refs[2]} onChange={() => check(2, setIdea, setIdeaPat)} defaultValue={elems1.idea}></textarea>
                    <div className="d-flex justify-content-between align-items-start">
                        { elems1.ideaPat != "" && <span className="color-blue">{elems1.ideaPat}</span>}
                        <span className="symbs">{elems1.idea.length} символов</span>
                    </div>
                </div>
            </div>
            <div className="mt-3 text-right">
                <button className="create_btn" onClick={tryNext}>Далее</button>
            </div>
        </>
    );
}

export default LevelOne;