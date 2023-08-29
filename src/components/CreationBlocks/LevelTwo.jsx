import { setStep } from "../../redux/slices/creationSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    setAboutAuthor,
    setAboutAuthorPat,
    setImage,
    setImagePat,
     } from '../../redux/slices/creationSlice';
import { useRef } from "react";
import OneGoal from './OneGoal';
import serverURL from "../../serveraddress";
function LevelTwo() {

    const refs = [useRef(), useRef()];
    const dispatch = useDispatch();

    const action = useSelector(state => state.creation.action);
    const elems2 = useSelector(state => state.creation.elems2);
    const check = (index, method, pat_method) => {
        const value = refs[index].current.value;
        let mistake = "";
        if (index == 0 && (value.length < 50 || value.length > 1000)) {
            mistake = "Рекомендуемая длина - 100-500 символов. Минимальная - 50, максимальная - 1000";
        }
        else if (index == 1 && (value.length < 50 || value.length > 1000)) {
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

    const checkImage = () => {
        let file = refs[1].current.files[0];
        console.log('checking main file');
        console.log(file);
        if (!file) {
            dispatch(setImagePat("Фото обязательно"));
            dispatch(setImage(null));
        }
        else {
            dispatch(setImagePat(""));
            dispatch(setImage(file));
        }
    }
    const input_file = <input type="file" name="main_photo" className="form-control" ref={refs[1]} onChange={checkImage} />;


    const tryNext = () => {
        if (!elems2.aboutAuthorPat && !elems2.goalsPat && !elems2.imagePat)
            dispatch(setStep(3))
    }

    return (
        <>
            <div className="for_form">
                <div className="mt-5">
                    <label htmlFor="about_author">Опишите себя как автора проекта</label>
                    <textarea name="about_author" className="form-control big white" placeholder="талантливый, покладистый студент, в зачетке только пятерки. В 2021 году поступил на УрБАС, о чем ни разу не пожалел. Очень нравится выбранная специальность..." defaultValue={elems2.aboutAuthor} onChange={() => check(0, setAboutAuthor, setAboutAuthorPat)} ref={refs[0]}></textarea>
                    <div className="d-flex justify-content-between align-items-start">
                        {elems2.aboutAuthorPat && <span className="color-blue">{elems2.aboutAuthorPat}</span>}
                        <span className="symbs">{elems2.aboutAuthor.length} символов</span>
                    </div>
                </div>
                <div className="mt-5">
                    <label htmlFor="goal">Расскажите о целях проекта (минимум 3)</label>
                    {
                        elems2.goals.map((g, i, arr) => {
                            return (
                                <OneGoal key={i} last={arr.length-1 == i} index={i} goal={g}/>
                            )
                        })
                    }
                    {elems2.goalsPat && <span className='color-blue'>{elems2.goalsPat}</span>}
                    
                </div>
                <div className="mt-5">
                    {
                        action == "Создание" &&  <>
                        <label htmlFor="idea">Выберите изображение</label>
                        {/* {input_file} */}
                        <input type="file" class='form-control' ref={refs[1]} onChange={checkImage} />
                        </>
                    }
                    {
                        action != "Создание" && elems2.path && 
                        <><br />
                        <label>
                        <img src={serverURL + "uploads/" + elems2.path} style={{height: "5rem"}} />
                        <div  style={{display: "none"}}>{input_file}</div>
                        </label></>
                    }
                    {
                         action != "Создание" && !elems2.path &&
                         <>
                         <p>Фото проекта не выбрано</p>
                        {input_file}
                        </>
                    }
                    {elems2.imagePat && <span className="color-blue">{elems2.imagePat}</span>}
                </div>
            </div>
            <div className="mt-3 text-right">
                <button className="create_btn" onClick={tryNext}>Далее</button>
            </div>
        </>
    );
}

export default LevelTwo;