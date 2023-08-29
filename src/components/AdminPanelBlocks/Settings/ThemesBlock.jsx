import axios from "axios";
import { useState } from "react";
import serverURL from "../../../serveraddress";
import ThemesFilters from "./ThemesFilters";
import ThemeTr from "./ThemeTr";
import { useEffect } from "react";
function ThemesBlock() {

    const [themes, setThemes] = useState([]);
    const [bigThemes, setBigThemes] = useState([]);

    useEffect(() => {
        axios.get(serverURL+"themes/all").then(
            res => {
                setThemes(res.data.themes);
                let th = res.data.themes.filter(t => !t.parent_id);
                setBigThemes(th);
                console.log(res.data.themes);
            }
        )
    }, []);

    return (
        <div className="themes-settings mt-5">
            <ThemesFilters bigs={bigThemes}/>
            <table className="table  table-striped mt-3">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Иконка</th>
                        <th>Название</th>
                        <th>Тема-родитель</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        themes.map((t,i) => <ThemeTr key={t.id} theme={t} index={i} />)
                    }
                    
                </tbody>
            </table>
        </div>
    );
}

export default ThemesBlock;