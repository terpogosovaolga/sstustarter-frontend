import { useEffect, useState } from "react";
import Filters from "./Users/Filters";
import TableView from "./Users/TableView";
import axios from "axios";
import serverURL from "../../serveraddress";
import FlyAlert from '../FlyAlert';
import GridView from "./Users/GridView";
import { FilterContext } from "./Users/FiltersContext";
function UsersBlock() {

    const [view, setView] = useState(0);

    const [users, setUsers] = useState([]);

    const [changed, setChanged] = useState(false);
    useEffect(()=> {
        axios.get(serverURL+"users")
        .then(res => {
            console.log(res.data);
            if (res.data.success == true) {
                setUsers(res.data.users);
            }
        })
    }, [changed]);

    const [filters, setFilters] = useState({
        search: "",
        role: "",
        structure: ""
    })
    const attrs = ["search", "role", "structure"];
    const updateFilters = (index, value) => {
        console.log(index, value);
        let f = filters;
        f[attrs[index]] = value;
        setFilters(f);

        axios.post(serverURL + "users/filter", {...filters})
        .then(res => {
            console.log(res.data);
            if (res.data.success) {
                setUsers(res.data.users);
            }
        });
    }

    return (
        <FilterContext.Provider value={{filters: filters, updateFilters: updateFilters}}>
            <div className="users-secs">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="toggleview">
                        <div className={view == 0 ? "tableview active" : "tableview"} onClick={() => setView(0)}> 
                            <svg width="26" height="22" viewBox="0 0 26 22" fill={view == 0 ? "white" : "#0061c7"} xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.6758 0.0517578H2.36328C1.06885 0.0517578 0.0195312 1.10107 0.0195312 2.39551V19.583C0.0195312 20.8774 1.06885 21.9268 2.36328 21.9268H22.6758C23.9702 21.9268 25.0195 20.8774 25.0195 19.583V2.39551C25.0195 1.10107 23.9702 0.0517578 22.6758 0.0517578ZM10.957 18.8018H3.14453V14.1143H10.957V18.8018ZM10.957 10.9893H3.14453V6.30176H10.957V10.9893ZM21.8945 18.8018H14.082V14.1143H21.8945V18.8018ZM21.8945 10.9893H14.082V6.30176H21.8945V10.9893Z"  fill={view == 0 ? "white" : "#0061c7"} />
                            </svg>
                        </div>
                        <div className={view == 1 ? "gridview active" : "gridview"} onClick={() => setView(1)}>
                            <svg width="23" height="16" viewBox="0 0 23 16" fill={view == 1 ? "white" : "#0061c7"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.26953 9.55176H2.14453C1.28174 9.55176 0.582031 10.2515 0.582031 11.1143V14.2393C0.582031 15.1021 1.28174 15.8018 2.14453 15.8018H5.26953C6.13232 15.8018 6.83203 15.1021 6.83203 14.2393V11.1143C6.83203 10.2515 6.13232 9.55176 5.26953 9.55176ZM13.082 9.55176H9.95703C9.09424 9.55176 8.39453 10.2515 8.39453 11.1143V14.2393C8.39453 15.1021 9.09424 15.8018 9.95703 15.8018H13.082C13.9448 15.8018 14.6445 15.1021 14.6445 14.2393V11.1143C14.6445 10.2515 13.9448 9.55176 13.082 9.55176ZM20.8945 9.55176H17.7695C16.9067 9.55176 16.207 10.2515 16.207 11.1143V14.2393C16.207 15.1021 16.9067 15.8018 17.7695 15.8018H20.8945C21.7573 15.8018 22.457 15.1021 22.457 14.2393V11.1143C22.457 10.2515 21.7573 9.55176 20.8945 9.55176ZM5.26953 0.176758H2.14453C1.28174 0.176758 0.582031 0.876465 0.582031 1.73926V4.86426C0.582031 5.72705 1.28174 6.42676 2.14453 6.42676H5.26953C6.13232 6.42676 6.83203 5.72705 6.83203 4.86426V1.73926C6.83203 0.876465 6.13232 0.176758 5.26953 0.176758ZM13.082 0.176758H9.95703C9.09424 0.176758 8.39453 0.876465 8.39453 1.73926V4.86426C8.39453 5.72705 9.09424 6.42676 9.95703 6.42676H13.082C13.9448 6.42676 14.6445 5.72705 14.6445 4.86426V1.73926C14.6445 0.876465 13.9448 0.176758 13.082 0.176758ZM20.8945 0.176758H17.7695C16.9067 0.176758 16.207 0.876465 16.207 1.73926V4.86426C16.207 5.72705 16.9067 6.42676 17.7695 6.42676H20.8945C21.7573 6.42676 22.457 5.72705 22.457 4.86426V1.73926C22.457 0.876465 21.7573 0.176758 20.8945 0.176758Z"  fill={view == 1 ? "white" : "#0061c7"} />
                            </svg>
                        </div>
                    </div>
                </div>

                <Filters />

                {
                    view == 0 && users &&
                    <TableView users={users} changed={() => setChanged(true)} />
                }

                {
                    view == 1 && users &&
                    <GridView users={users} changed={() => setChanged(true)} />
                }

                {
                    users.length == 0 &&
                    <h1>Ничего не найдено по вашему запросу</h1>
                }


            </div>


            {
                changed && <FlyAlert text="Изменения успешно сохранены" setSended={() => {setChanged(false)}}/>
            }
        </FilterContext.Provider>
    );
}

export default UsersBlock;