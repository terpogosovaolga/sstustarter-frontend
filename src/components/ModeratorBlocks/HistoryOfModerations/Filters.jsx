import { useContext, useRef } from "react";
import { ModerationsContext } from "../HistoryOfModerationsBlock"

export default function Filters() {

    const {filters, setFilters } = useContext(ModerationsContext);

    const refs = [useRef(), useRef(), useRef()];

    

    return (
        <div className="users-filters mt-3 d-flex justify-content-between align-items-center">
            <div className="m25">
                <input type="text" className="form-control big" placeholder="Поиск по названию, автору, сообщению" defaultValue={filters.search} ref={refs[0]} onChange={() => setFilters(refs[0].current.value, "search")}/>
            </div>
            <div className="m25">
                <select name="" id="" className="form-select big"  defaultValue={filters.status} ref={refs[1]} onChange={() => setFilters(refs[1].current.value, "status")}>
                    <option value="0">Все</option>
                    <option value="3">Опубликованные</option>
                    <option value="4">Возвращенные</option>
                    <option value="5">Удаленные</option>
                </select>
            </div>
            <div className="m25">
                <select name="" id="" className="form-select big"  defaultValue={filters.sort} ref={refs[2]} onChange={() => setFilters(refs[2].current.value, "sort")}>
                    <option value="m.created_date-desc">по дате с позднего</option>
                    <option value="m.created_date-asc">по дате с раннего</option>
                    <option value="project_id-asc">по проектам</option>
                    <option value="author_id-asc">по авторам</option>
                    <option value="m.status_id-asc">по статусам</option>
                </select>
            </div>
        </div>
    )
}