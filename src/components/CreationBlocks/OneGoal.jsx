import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoals, setGoalByIndex, setGoalsPat, addEmptyGoal, removeGoal, setGoal } from "../../redux/slices/creationSlice";
import serverURL from "../../serveraddress";

function OneGoal({last, index, goal}) {
    const refs = [useRef(), useRef()];
    const dispatch = useDispatch();

    const elems2 = useSelector(state => state.creation.elems2);
    const action = useSelector(state => state.creation.action); 
    const check = () => {
        const text = refs[0].current.value;
        const image = refs[1].current.files[0];

        let newg = {};
        if (action == "Редактирование") {
            newg.index = index;
            if (goal.id) {
                newg.id = goal.id;
            }
            newg.text = text;
            if (image) {
                newg.image = image;
            }
            else if (goal.path) {
                newg.path = goal.path;
            }
        }
        else {
            newg.index = index;
            newg.text = text;
            newg.image = image;
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!negw');
            console.log(newg);
        }
        dispatch(setGoalByIndex(newg));

        const goals = elems2.goals;
        let mistake = "";
        for (const g of goals) {
            if (!g.text) {
                mistake = "Напишите минимум 3 цели";
            }
        }
        if (goals.length < 3) {
            mistake = "Напишите минимум 3 цели";
        }
        dispatch(setGoalsPat(mistake));
    }

    return (
        <div className="one_goal">
            <span className="goal_number">{index+1}</span> <input type="text" className="form-control big white" name="goal1" placeholder="Упростить процесс обучения студентов-медиков в российских вузах" ref={refs[0]} defaultValue={goal.text} onChange={check}/> 
            { action == "Создание" && 
                <input type="file" className="form-control" name="image1" ref={refs[1]}  onChange={check}/>
            }
            { action == "Редактирование" && goal.photo && 
                <label>
                <img src={serverURL + "uploads/" + goal.photo.path} style={{height: "2rem"}}/>
                <input type="file" className="form-control" name="image1" ref={refs[1]}  onChange={check} style={{display: "none"}}/>
                </label>
            }
            { action == "Редактирование" && !goal.photo && 
                <label>
                <span>Фото не выбрано</span>
                <input type="file" className="form-control" name="image1" ref={refs[1]}  onChange={check}/>
                </label>
            }
            {last && <span onClick={() => dispatch(addEmptyGoal())} className="more_goal">+</span>}
            {!last && <span onClick={() => dispatch(removeGoal(index))} className="more_goal" style={{fontSize: "1rem"}}>x</span>}
        </div>
    );
}

export default OneGoal;