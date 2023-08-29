import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


export default function MonthesCreation() {


    const [activeI, setActiveI] = useState(0);

    const [data, setData] = useState(0);
    const [data2, setData2] = useState(0);
    
    useEffect(() => {
        if (activeI== 0)  {
            setData([0, 0, 0, 0, 12, 28, 0, 0, 0, 0, 0, 0]);
            setData2([0, 0, 0, 0, 3, 9, 0, 0, 0, 0, 0, 0]);
        }
        else if (activeI == 1) {
            setData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setData2([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }, [activeI]);
    

    return (
        <div className="statistic_block">
            <h2>Динамика создания проектов по месяцам</h2>
            <nav className="profile_menu main d-flex flex-row justify-content-start align-items-center mt-5 mb-5">
                <a style={activeI == 0 ? {} : {color: "#0060c77c"}} className={activeI == 0 ? "active" : ""} onClick={() => setActiveI(0)}>Текущий учебный год</a>
                <a style={activeI == 1 ? {} : {color: "#0060c77c"}} className={activeI == 1 ? "ml-2rem active" : "ml-2rem"} onClick={() => setActiveI(1)}>Прошлый учебный год</a>
            </nav>
            <div className="d-flex justify-content-start align-items-center">
                <div style={{width: "400px"}}><AuthorChart data={data} data2={data2}/></div>
                
            </div>
            
        </div>
    )
}


function AuthorChart({data, data2}) {
    
    const pieChartData = {
        labels: ["Январь", "Февраль", "Март", "Апрель", "Март", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        datasets: [
            {
              data: data,
              label: "Количество опубликованных проектов",
              borderColor: "#B4D0EE",
              fill: true,
              lineTension: 0.5
            },
            {
                data: data2,
                label: "Количество созданных проектов",
                borderColor: "#007CFF",
                fill: true,
                lineTension: 0.5
              }
        ]
      };

    return <Line
        type="line"
        width="300px"
        height="300px"
        plugins={{
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Chart.js Pie Chart'
            }
        }}
        data={pieChartData}
    />
};