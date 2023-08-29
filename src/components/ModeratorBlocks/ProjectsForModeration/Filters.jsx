import { useRef } from "react";

export default function Filters({filters, setFilters, filterData}) {

    const refs = [useRef(), useRef(), useRef()];

    const setSearchString = () => {
        let filters_ = filters;
        filters_.searchString = refs[0].current.value;
        setFilters(filters);
        filterData();
    }

    const setSort = () => {
        console.log('sort');
        let filters_ = filters;
        filters_.sort = refs[2].current.value;
        setFilters(filters); 
        filterData();
    }

    return (
        <div className="users-filters mt-3 d-flex justify-content-between align-items-center">
            <div className='w30'>
                <input type="text" name="search" className="form-control big" placeholder="Поиск по названию, ФИО автора" ref={refs[0]} onChange={setSearchString} />
            </div>
            <div className="w30">
                <select name="" id="" className="form-select big">
                    <option value="all">Все</option>
                    <option value="first">Впервые на модерации</option>
                    <option value="repeat">Повторно отправленные на модерацию</option>
                    <option value="meonly">Исключить проекты других модераторов</option>
                </select>
            </div>

            <div className="w25">
                <select name="" className="form-select big" id="" ref={refs[2]} onChange={setSort}>
                    <option value="old">сначала старые</option>
                    <option value="new">сначала новые</option>
                    <option value="returned">сначала возвращенные</option>
                </select>
            </div>
        </div>
    );
}