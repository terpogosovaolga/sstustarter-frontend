import axios from "axios";
import { useEffect, useRef, useState } from "react";
import serverURL from "../../serveraddress";
import { useSelector, useDispatch } from "react-redux";
import {
    setStructure,
    setTheme,
    setStep,
    setCreatedBy,
    isFiltersOn,
    makeFilter
  } from '../../redux/slices/filterSlice';
import { useSearchParams } from "react-router-dom";

function BigFilters({theme_, isReset, setReset}) {
    const [themes, setThemes] = useState([]);
    const [steps, setSteps] = useState([]);
    const [structures, setStructures] = useState([]);
    console.log('big filters  ' + theme_);
    const dispatch = useDispatch();
    
    // тема, шаги, структура, кем создан
    const refs = [useRef(), useRef(), useRef(), useRef()];

    useEffect(() => {
        console.log('eff themes!');
        console.log(themes);
        if (theme_) {
            findTheme(theme_);
        }
    }, [themes]);

    const findTheme = (str) => {
        console.log('finding');
        console.log(str);
        console.log(themes);
        let theme = themes.filter((t) => t.name == str)[0];
        console.log(theme);
        if (theme) {
            dispatch(setTheme(theme.id));
            dispatch(isFiltersOn());
        }
        else {
            dispatch(setTheme(0));
        }
        dispatch(makeFilter());
        
    }
    const findStep = () => {
        let str = refs[1].current.value;
        let step = steps.filter((s) => s.name == str)[0];
        if (step) {
            dispatch(setStep(step.id));
            dispatch(isFiltersOn());
        }
        else {
            dispatch(setStep(0));
        }
        dispatch(makeFilter());
    }
    const findStructure = () => {
        let str = refs[2].current.value;
        let structure = structures.filter((s) => (s.decoding == str || s.abbreviation == str))[0];
        if (structure) {
            dispatch(setStructure(structure.id));
            dispatch(isFiltersOn());
        }
        else {
            dispatch(setStructure(0));
        }
        dispatch(makeFilter());
    }

    const changeFilter = (method, value) => {
        dispatch(method(value));
        dispatch(makeFilter());
    }


    useEffect(()=> {
        axios.get(serverURL + "themes/all")
        .then(response => {
            if (response.data.success) {
                setThemes(response.data.themes);
            }
            else {
                console.log('error');
            }
        });

        axios.get(serverURL + "steps/all")
        .then(response => {
            if (response.data.success) {
                setSteps(response.data.steps);
            }
            else {
                console.log('error');
            }
        });

        axios.get(serverURL + "structures")
        .then(response => {
            if (response.data.success) {
                setStructures(response.data.structures);
            }
            else {
                console.log('error');
            }
        });

        
    }, []);

    if (isReset) {
        refs[0].current.value = "Любая тема";
        refs[1].current.value = "Любой этап";
        refs[2].current.value = "Все структурные подразделения";
        refs[3].current.value = "неважно";
        setReset(false);
    }
    return (
        <div style={{backgroundColor: "var(--light)", padding: "2rem"}} className="d-flex justify-content-between align-items-center">
            <input list="theme"  className='form-control white' id="theme-choice" name="theme-choice" placeholder="Тема" onChange={() => findTheme(refs[0].current.value)} required ref={refs[0]} defaultValue={theme_ ? theme_ : ""} />
            <datalist name="theme" className="form-control white" id="theme" style={{display: "none"}} >
                <option value="Любая тема"></option>
                {
                    themes.map(t => <option value={t.name} key={t.id}> </option>)
                }
            </datalist>

            <input list="step"  className='form-control white' id="step-choice" name="step-choice" placeholder="Текущий этап проекта" onChange={findStep} required ref={refs[1]} />
            <datalist name="step" className="form-control" id="step" style={{display: "none"}} >
                <option value="Любой этап"></option>
                {
                    steps.map(s => <option value={s.name} key={s.id}> </option>)
                }
            </datalist>
            
            <input list="structure"  className='form-control white' id="structure-choice" name="step-choice" placeholder="Структурное подразделение автора проекта" required onChange={findStructure} ref={refs[2]}/>
            <datalist name="structure" className="form-control" id="structure" style={{display: "none"}} >
                <option value="Все структурные подразделения"></option>
                {
                    structures.map((str) => { return (str.id !== 5 ? <option value={str.abbreviation ? str.abbreviation : str.decoding} key={str.id}> </option> : "")})
                }
            </datalist>

            <div><label htmlFor="created">проект создан</label>
            <select className='form-select white' name="created" ref={refs[3]} onChange={() => {changeFilter(setCreatedBy, refs[3].current.value)}}>
                <option value="all">неважно</option>
                <option value="студентом">студентом</option>
                <option value="сотрудником">сотрудником</option>
            </select></div>
        </div>
    );
}

export default BigFilters;