import UserGridDiv from "./UserGridDiv";
import EditRole from "./EditRole";
import { useState } from "react";
export default function GridView({users, changed}) {
    
    const [roling, setRoling] = useState(-1);


    const editRole = (id) => {
        console.log(id);
        setRoling(id);
    }

    const close = () => {
        setRoling(-1);
    }
    return (
        <div className="grid-users mt-3">
            <div className="users d-flex justify-content-betweenalign-items-center flex-wrap">
                {
                    users.map((u, i) => <UserGridDiv user={u} key={u.id} index={i} roleFunc={() => editRole(i)}/>)
                }
            </div>
            {
                roling != -1 && <EditRole user={users[roling]} closeFunc={close} saveFunc={changed}/>
            }
        </div>
    );
}
