import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";


export default function Members() {


    const [activeI, setActiveI] = useState(0);

    const [data, setData] = useState(0);
    
    useEffect(() => {
        if (activeI== 0)  {
            setData([50,3])
        }
        else if (activeI == 1) {
            setData([60,4])
        }
        else {
            setData(0, 0);
        }
    }, [activeI]);
    

    return (
        <div className="statistic_block">
            <h2>Участники проектов</h2>
            <nav className="profile_menu main d-flex flex-row justify-content-start align-items-center mt-5 mb-5">
                <a style={activeI == 0 ? {} : {color: "#0060c77c"}} className={activeI == 0 ? "active" : ""} onClick={() => setActiveI(0)}>Текущий месяц</a>
                <a style={activeI == 1 ? {} : {color: "#0060c77c"}} className={activeI == 1 ? "ml-2rem active" : "ml-2rem"} onClick={() => setActiveI(1)}>Текущий учебный год</a>
                <a style={activeI == 2 ? {} : {color: "#0060c77c"}} className={activeI == 2 ? "ml-2rem active" : "ml-2rem"} onClick={() => setActiveI(2)}>Прошлый учебный год</a>
            </nav>
            <div className="d-flex justify-content-start align-items-center">
                <div style={{width: "400px"}}><AuthorChart data={data}/></div>
                
            </div>
            
        </div>
    )
}


function AuthorChart({data}) {
    
    const pieChartData = {
        labels: ["Участники-студенты", "Участники-сотрудники"],
        datasets: [{
            data: data,
            label: "Должности проектов",
            backgroundColor: ["#007CFF", "#B4D0EE"],
            hoverBackgroundColor: ["#0051A7", "#81A4CA"]
        }]
      };

    return <Pie
        type="pie"
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