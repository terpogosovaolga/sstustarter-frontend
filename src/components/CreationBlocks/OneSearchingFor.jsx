import { useDispatch, useSelector } from 'react-redux';
import {removeSearchingFor, setOneSearchingFor, setSearchingForPat, addEmptySearchingFor} from '../../redux/slices/creationSlice';
import { useRef } from 'react';

function OneSearchingFor({last, index, searchingFor}) {

    const dispatch = useDispatch();
    const ref = useRef();

    const elems3 = useSelector(state => state.creation.elems3);
    const action = useSelector(state => state.creation.action);

    let defvalue;
    if (action !== "Создание") {
        defvalue = searchingFor.text;
    } 
    else {
        defvalue = searchingFor;
    }

    const check = () => {
        const value = ref.current.value;
        dispatch(setOneSearchingFor({index: index, text: value}));
        const searchs = elems3.searchingFor;
        let mistake = "";
        for (const g of searchs) {
            if (!g) {
                mistake = "Заполните хотя бы один пункт";
            }
        }
        console.log(searchs.length);
        dispatch(setSearchingForPat(mistake));
    }
    return (
        <div className="one_goal">
            <span className="goal_number">{index+1}</span> 
            <input type="text" className="form-control big white" name={"searching_for"+index} placeholder="Верстальщиков - для реализации идей дизайнеров" defaultValue={defvalue} onChange={check} ref={ref}/>
            {last && <span className="more_goal" onClick={() => dispatch(addEmptySearchingFor())}>+</span>}
            {!last && <span onClick={() => dispatch(removeSearchingFor(index))} className="more_goal" style={{fontSize: "1rem"}}>x</span>}
        
        </div>
    );
}

export default OneSearchingFor;