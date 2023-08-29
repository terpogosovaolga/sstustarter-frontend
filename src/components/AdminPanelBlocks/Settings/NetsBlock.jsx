import axios from "axios";
import { useEffect, useState, useRef } from "react";
import serverURL from "../../../serveraddress";
import NetTr from "./NetTr";
import AddNet from "./AddNet";

function NetsBlock() {

    const [nets, setNets] = useState([]);
    const [allNets, setAllNets] = useState([]);

    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const [update, setUpdate] = useState(false);
    useEffect(() => {
        axios.get(serverURL + "netsicons")
        .then(res => {
            console.log(res.data);
            setNets(res.data.icons);
            setAllNets(res.data.icons);
        })
    }, [update]);

    const ref = useRef();

    const searchFunc = () => {
        const value = ref.current.value;
        if (value.trim() == "") {
            setNets(allNets);
        }
        else {
            let nn = allNets.filter(n =>  n.net.indexOf(value) != -1);
            setNets(nn);
        }
    }

    
    return (
        <div className="icons-settings mt-5">
            <div>
                <input type="text" className="form-control big " name="search" placeholder="Поиск по названию соцсети" ref={ref} onChange={searchFunc} />
            </div>
            <div className='for_btn mt-3 d-flex justify-content-end'>
                <div className='ready' onClick={() => setIsOpenAdd(true)}>Добавить соцсеть</div>
            </div>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Активна</th>
                        <th>№</th>
                        <th>Фото</th>
                        <th>Название соцсети</th>
                        <th>Ссылка</th>
                        <th>Дата добавления</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        nets.map((n, i) => <NetTr  key={n.id} net={n} index={i} setUpdate={() => setUpdate(true)}/>)
                    }
                    {
                        nets.length == 0 && <h1>Ничего не найдено</h1>
                    }
                </tbody>
            </table>
            {
                isOpenAdd &&
                    <AddNet closeBlock={setIsOpenAdd}/>
            }
        </div>
    );
}

export default NetsBlock;