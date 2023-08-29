import axios from "axios";
import { useEffect, useState } from "react";
import serverURL from "../../../serveraddress";
import StructureFilters from "./StructureFilters";
import StructureTr from "./StructureTr";
function StructuresBlock() {

    const [structures, setStructures] = useState([]);
    const [allStructures, setAllStructures] = useState([]);
    const [bigStructures, setBigStructures] = useState([]);

    useEffect(() => {
        axios.get(serverURL+"structures")
        .then(res => {
            if (res.data.success) {
                console.log(res.data);
                setStructures(res.data.structures);
                setAllStructures(res.data.structures);
                let strs = res.data.structures.filter(s => !s.parent_id);
                setBigStructures(strs);
            }
        })
    }, []);

    return (
        <div className="structure-settings mt-5">
            <StructureFilters bigs={bigStructures} />
            <table className="table  table-striped mt-3">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Аббревиатура</th>
                        <th>Расшифровка</th>
                        <th>Структура-родитель</th>
                        <th>Описание</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        structures.map((s, i) => <StructureTr structure={s} index={i}/>)
                    }
                    
                </tbody>
            </table>
        </div>
    );
}

export default StructuresBlock;