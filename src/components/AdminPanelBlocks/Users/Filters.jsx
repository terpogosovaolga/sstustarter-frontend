import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import serverURL from "../../../serveraddress";
import { FilterContext } from "./FiltersContext";

function Filters() {

    const [structures, setStructures] = useState([]);

    const {filters, updateFilters} = useContext(FilterContext);

    useEffect(() => {
        axios.get(serverURL + "structures")
        .then(res => {
            console.log(res.data);
            if (res.data.success) {
                setStructures(res.data.structures);
            }
        })
    }, []);

    const refs = [useRef(), useRef(), useRef()];

    

    return (
        <div className="users-filters mt-3 d-flex justify-content-between align-items-center">
            <div className='w25'>
                <input type="text" name="search" className="form-control big" placeholder="Поиск по ФИО, должности, структуре" defaultValue={filters.search} onChange={() => updateFilters(0, refs[0].current.value)} ref={refs[0]}/>
            </div>
            <div className="w30">
                <select name="role" className="form-select big" defaultValue={filters.role} onChange={() => updateFilters(1, refs[1].current.value)} ref={refs[1]}>
                    <option value="">Все роли</option>
                    <option value="1">Пользователь</option>
                    <option value="2">Администратор</option>
                    <option value="3">Модератор</option>
                    <option value="4">Администратор или модератор</option>
                </select>
            </div>
            <div className="w30">
                <select name="structure" className="form-select big" defaultValue={filters.structure} onChange={() => updateFilters(2, refs[2].current.value)} ref={refs[2]}>
                    <option value="">Все структуры</option>
                    {
                        structures.map(s => <option key={s.id} value={s.id}>{s.abbreviation ? s.abbreviation : s.decoding} </option>)
                    }
                </select>
            </div>
        </div>
    );
}

export default Filters;