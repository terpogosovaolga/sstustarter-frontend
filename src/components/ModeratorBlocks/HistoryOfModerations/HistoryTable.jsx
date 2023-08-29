import axios from "axios";
import { createContext, useEffect, useState } from "react"
import serverURL from "../../../serveraddress";
import { useSelector } from "react-redux";
import ModerationTr from "./ModerationTr";


export default function HistoryTable({moderations}) {


    const userId = useSelector(state => state.auth.userId); 

    return (
        <div className="table-history mt-3">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Статус</th>
                        <th>Проект</th>
                        <th>Автор</th>
                        <th>Сообщение</th>
                        <th>Дата проверки</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        moderations.map((m,i) => <ModerationTr key={m.id} moderation={m} index={i}/>)
                    }
                    {
                        moderations.length == 0 && <h3>По Вашему запросу ничего не найдено</h3>
                    }
                </tbody>
            </table>
        </div>
    )
}