import { useState } from "react";

function FlyAlert({text, setSended}){
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="flyalert"> 
            <p>{text}</p>
            <span onClick={()=>setSended(false)}>x</span>
        </div>
    )
}

export default FlyAlert;