import Header from "../components/Header";
import Footer from "../components/Footer";
import Filters from '../components/CatalogBlocks/Filters';
import Project from "../components/CatalogBlocks/Project";
import { useEffect, useState } from "react";
import axios from "axios";
import serverURL from "../serveraddress";
import { useDispatch, useSelector } from "react-redux";
import { withoutFilters } from "../redux/slices/filterSlice";
import { useSearchParams } from "react-router-dom";
function Catalog() {

    

    // const filters = useSelector((state) => state.filter.filters);
    const {projects, status, error} = useSelector((state) => state.filter);
    const [searchProjects, setSearchProjects] = useState(projects);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log('useeff');
        dispatch(withoutFilters());
    }, [dispatch]);

    const [isSearch, setIsSearch] = useState(false);

    const searchFunc = (str) => {
        console.log('searcch'+str);
        if (str.trim().length > 0) {
            setSearchProjects(projects.filter(p => p.name.toLowerCase().includes(str.toLowerCase()) || (p.author.name.toLowerCase()+" "+p.author.surname.toLowerCase()).toLowerCase().includes(str.toLowerCase())));
            setIsSearch(true);
        }
        else {
            setIsSearch(false);
        }
        
    }

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <section className="projects_catalog">
                        <h1>Найдите то, что по вкусу!</h1>
                        <Filters searchFunc={searchFunc}/>

                        {
                            status == "pending" && <h1>Загрузка...</h1>
                        }
                        {
                            status == "error" && <h1>{error}</h1>
                        }
                        {status == "ready" && <div className="projects small d-flex justify-content-between">
                            
                            {
                                isSearch ? 
                                searchProjects.map(p => <Project key={p.id} project={p}/>) : projects.map(p => <Project key={p.id} project={p}/>)
                            }
                        </div>}
                        {
                            status === "ready" && (isSearch && searchProjects.length == 0 || !isSearch && projects.length == 0) &&  <h1>По запросу ничего не найдено</h1>
                        }
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Catalog;