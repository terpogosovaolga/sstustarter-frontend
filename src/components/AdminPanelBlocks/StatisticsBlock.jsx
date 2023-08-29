
import {Chart, CategoryScale} from 'chart.js';
import { registerables} from 'chart.js';
import Authors from "./Statistics/Authors";
import Members from "./Statistics/Members";
import MonthesCreation from "./Statistics/MonthesCreation";

Chart.register(CategoryScale);
Chart.register(...registerables);
export default function StatisticsBlock() {
    return (
        <>
            <h1>Аналитика проектной деятельности СГТУ</h1>

            <Authors />
            <br /><br /><br />
            <Members />
            <br /><br /><br />
            <MonthesCreation />
        </>
    )
}