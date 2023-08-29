import { useState } from "react";
import UserTableTr from "./UserTableTr";
import EditRole from "./EditRole";

function TableView({users, changed}) {
    
    const [roling, setRoling] = useState(-1);


    const editRole = (id) => {
        console.log(id);
        setRoling(id);
    }

    const close = () => {
        setRoling(-1);
    }


    return (
        <div className="table-users mt-3">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th> 
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Структура</th>
                        <th>Должность</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((u, i) => <UserTableTr user={u} key={u.id} index={i} roleFunc={() => editRole(i)}/>)
                    }
                </tbody>
            </table>
            {
                roling != -1 && <EditRole user={users[roling]} closeFunc={close} saveFunc={changed}/>
            }
        </div>

        
    );
}

export default TableView;