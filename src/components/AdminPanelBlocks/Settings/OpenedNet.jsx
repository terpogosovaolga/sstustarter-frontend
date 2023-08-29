import { useRef, useState } from "react"
import serverURL from "../../../serveraddress";
import axios from "axios";
import check from '../../../assets/images/icons/check.svg';
export default function OpenedNet({net, closeBlock, setAlert}) {

    const refs = [useRef(), useRef(), useRef(), useRef()];


    return (
        <div className="background">
            <div className="window" style={{backgroundColor: "white", padding: "2rem"}}>
                <h1>Редактирование</h1>
                <div className="d-flex justify-content-between align-items-stretch">
                    <label style={{backgroundColor: 'var(--light)'}}>
                        {net.path && <><img className="photo" src={serverURL+"uploads/"+net.path} height="100px"/>
                        <input type="file" style={{display: 'none'}}/></>}
                        {
                            !net.path && 
                            <input type="file" className="form-control"/>
                        }
                    </label>
                    <div style={{width: '50%'}}>
                        <input type="text" name="name" className="form-control big " defaultValue={net.net} placeholder="Название социальной сети"/>
                        <input type="text" name="slogan" className="form-control big mt-3" defaultValue={net.link} placeholder="Ссылка" />
                        {!net.archive ? ("Активна") : "Не активна"}
                        <div className="for_btn d-flex justify-content-end align-items-stretch mt-5">
                            <div className="ready">Готово</div>
                            <div className="cancel ml-2rem" onClick={() => closeBlock(false)}>Отмена</div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}