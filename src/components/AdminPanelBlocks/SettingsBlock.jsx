import { useState } from "react";
import Menu from "./Settings/Menu";
import HomeSettingsBlock from "./Settings/HomeSettingsBlock";
import NetsBlock from './Settings/NetsBlock';
import StructuresBlock from "./Settings/StructuresBlock";
import ThemesBlock from './Settings/ThemesBlock';
export default function SettingsBlock() {

    const [sec, setSec] = useState(0);

    return (
        <>
            <Menu sec={sec} setSec={setSec}/>

            {
                sec == 0 && <HomeSettingsBlock />
            }
            {
                sec == 1 && <NetsBlock />
            }
            {
                sec == 2 && <StructuresBlock />
            }
            {
                sec == 3 && <ThemesBlock />
            }
        </>
    );
}