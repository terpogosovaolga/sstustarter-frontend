import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneSearchingFor from "./OneSearchingFor";
import { setMembersCount, setMembersCountPat, createProject, updateProject } from "../../redux/slices/creationSlice";
import { useNavigate } from "react-router-dom";
function LevelThree({id}) {
    const ref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const elems3 = useSelector(state => state.creation.elems3);
    const userId = useSelector(state => state.auth.userId);
    const action = useSelector(state => state.creation.action);


    const check = () => {
        const value = parseInt(ref.current.value);
        dispatch(setMembersCount(value));
        if (value && value > 0) {
            dispatch(setMembersCountPat(""));
        }
        else {
            dispatch(setMembersCountPat("Напишите число участников"));
        }
    }

    const sendData = () => {
        if (action === "Создание") {
            dispatch(createProject());
            navigate("/profile/"+userId+"?message=created");
        }
        else {
            // dispatch ...edit project...
            dispatch(updateProject(id));
            navigate("/profile/" + userId+"?message=edited");
        }
    }
    return (
        <>
            <div className="for_form">
                <div className="mt-5">
                    <label for="about_author" style={{display: "block"}}>Укажите, сколько человек вы ищете</label>
                    <span className="color-blue">Как только вы подтвердите участие этого количества человек, проект станет закрытым для новых заявок</span>
                    <input type="number" className="form-control big white" min="1" max="100" ref={ref} defaultValue={elems3.membersCount} onChange={check} />
                    {elems3.membersCountPat && <span className='color-blue'>{elems3.membersCountPat}</span>}
                </div>
                <div className="mt-5">
                    <label for="goal" style={{display: "block"}}>Укажите, кого вы ищете</label>
                    <span className="color-blue">Сориентируйте соискателей: им нужно понимать, востребованы ли они</span>
                    {
                        elems3.searchingFor.map((g, i, arr) => 
                           <OneSearchingFor key={i} last={arr.length-1 == i} index={i} searchingFor={g}/>
                        )
                    }
                    {
                        elems3.searchingForPat && <span className="color-blue">{elems3.searchingForPat}</span>
                    }    
                    
                    
                </div>
            </div>
            <div className="mt-3 text-right">
                <button className="create_btn" onClick={sendData}>Готово</button>
            </div>
        </>
    );
}

export default LevelThree;