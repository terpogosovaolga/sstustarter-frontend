import searchnormal1 from "../../assets/images/icons/searchnormal1.svg";
import filters from '../../assets/images/icons/filter.svg';
import { useContext, useState } from "react";
import BigFilters from "./BigFilters";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import serverURL from "../../serveraddress";
import axios from "axios";
import {
    setSort,
    setVacOnly,
    setStructure,
    setTheme,
    setCreatedBy,
    resetFilters,
    isFiltersOn,
    isFiltersOff,
    toggleIsFilters,
    makeFilter,
    withoutFilters
  } from '../../redux/slices/filterSlice'
import { useSearchParams } from "react-router-dom";
function Filters({searchFunc}) {

    const dispatch = useDispatch();
    
    const filters = useSelector((state) => state.filter.filters);

    // sort, vacOnly, search
    const refs = [useRef(), useRef(), useRef()];


    const [searchParams, setSearchParams] = useSearchParams();
    const [th, setTh] = useState(searchParams.get('theme'));
    console.log("th filters : " + th);
    const [isOpenFilters, setIsOpenFilters] = useState(th ? true : false);

    const [isReset, setReset] = useState(false);

    const reset = () => {
        dispatch(resetFilters());
        dispatch(withoutFilters());
        refs[2].current.value = "";
        setReset(true);

    }

    return (
        <div className="filters">
            <label htmlFor="sort">показать сначала </label>
            <div className="filters_row d-flex justify-content-between align-items-stretch" style={{marginTop: 0}}>
                <div className="sort" style={{minWidth: "45%"}}>
                    <div className="d-flex flex-row align-items-center">
                        <select name="sort" id="sort" className="form-select" ref={refs[0]}  onChange={() => {dispatch(setSort(refs[0].current.value)); dispatch(makeFilter())}}>
                            <option value="new">самые новые</option>
                            <option value="old">самые старые</option>
                            <option value="pop">самые популярные</option>
                        </select>
                        <div className="form-check ml-2rem">
                            <input className="form-check-input" type="checkbox" value="" id="vacancy_only" name="vacancy_only" ref={refs[1]} onChange={() => {dispatch(setVacOnly(refs[1].current.checked))}}/>
                            <label className="form-check-label" htmlFor="vacancy_only">
                                только с вакансиями
                            </label>
                          </div>
                    </div>
                </div>

                <div className="search d-flex justify-content-end align-items-stretch" style={{width: "45%"}}>
                    <input type="search" className="form-control big" id="search" name="search" placeholder="Название, автор, тема" ref={refs[2]} onChange={() => searchFunc(refs[2].current.value)}/>
                    <div className="search_btn">
                        <img src={searchnormal1} alt="" />
                    </div>
                </div>
            </div>
            <div className="filters_row more_search d-flex justify-content-between align-items-center">
                <span onClick={()=>setIsOpenFilters(!isOpenFilters)} > Расширенный поиск</span>
                <span onClick={reset}>Сбросить фильтры</span>
            </div>
            {
                isOpenFilters && 
                <BigFilters theme_ = {th} isReset={isReset} setReset={setReset}/>
            }
        </div>
    );
}

export default Filters;