import axios from "axios";
import {useState, useEffect } from "react";
import serverURL from "../../../serveraddress";
import Moderation from "./Moderation";
import NewModerationForm from "./NewModerationForm";
export default function OpenedProject({project, close, setMessage}) {

    const [moderations, setModerations] = useState([]);


    useEffect(() => {
        axios.get(serverURL + "moderations/"+project.id)
        .then(res => {
            console.log(res.data);
            setModerations(res.data.moderations);
        })
    }, []);

    return (
        <div class="background">
            <div class="window" style={{backgroundColor: 'white'}}>
                <h2>История проверок "{project.name}"</h2>
                <div class="moders">
                    {
                        moderations.map(m => <Moderation moderation={m} key={m.id}/>)
                    }
                    <NewModerationForm project_id={project.id} close={close} sended={setMessage}/>
                    
                </div>
                
            </div>
        </div>
    );
}