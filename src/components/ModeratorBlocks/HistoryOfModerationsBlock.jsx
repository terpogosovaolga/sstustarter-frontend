import { useState, useEffect } from "react";
import Filters from "./HistoryOfModerations/Filters";
import HistoryTable from "./HistoryOfModerations/HistoryTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { createContext } from "react";
import serverURL from "../../serveraddress";
export const ModerationsContext = createContext("");

export default function HistoryOfModerationsBlock() {

    const [filters, setFilters] = useState({
        search: "",
        status: 0,
        sort: "created_date-desc"
    });

    const userId = useSelector(state => state.auth.userId);
    
    const [moderations, setModerations] = useState([]);

    const filter = (value, field) => {
        const flt = filters;
        flt[field] = value;
        setFilters(flt);

            axios.post(serverURL+"moderations/filter", {
                moderator_id: userId,
                status_id: filters.status,
                sort: filters.sort
            })
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    let moderations = res.data.moderations;
                    if (filters.search){
                        const search = filters.search.toLowerCase();
                        moderations = moderations.filter(m => (m.message.toLowerCase().includes(search) || m.project.name.toLowerCase().includes(search) || (m.project.author.name.toLowerCase() + " " + m.project.author.surname.toLowerCase()).includes(search)) );
                    }
                    
                    setModerations(moderations);
                }
            })
    }


    useEffect(() => {
        if (!filters.status && filters.sort == "created_date-desc") {
            axios.get(serverURL+"moderations/moderator/" + userId)
            .then(res => {
                if (res.data.success) {
                    let moderations = res.data.moderations;
                    if (filters.search){
                        const search = filters.search.toLowerCase();
                        moderations = moderations.filter(m => (m.message.toLowerCase().includes(search) || m.project.name.toLowerCase().includes(search) || (m.project.author.name.toLowerCase() + " " + m.project.author.surname.toLowerCase()).includes(search)) );
                    }
                    
                    setModerations(moderations);
                }
            })
        }
    }, [filters]);

    console.log("status : " + filters.status);

    return (
        <div className="history-secs">
            <ModerationsContext.Provider value={{filters: filters, setFilters: filter}}>
                <Filters />
                <HistoryTable moderations={moderations}/>
            </ModerationsContext.Provider>
        </div>
    );
}