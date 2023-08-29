import { useRef, useState } from "react";
import AddStructure from "./AddStructure";

function StructureFilters({bigs}) {

    const refs = [useRef(), useRef()];

    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const searchFunc = () => {

    }

    const strFunc = () => {

    }

    return (
        <>
        <div className="users-filters mt-3 d-flex justify-content-between align-items-center">
                <div>
                    <input type="text" className="form-control big " name="search" placeholder="Поиск по аббревиатуре, расшифровке" ref={refs[0]} onChange={searchFunc}/>
                </div>
                <div>
                    <select className="form-select big" name="parent" ref={refs[1]} onChange={strFunc}>
                        <option value="">Все структуры</option>
                        <option value="0">Только первого уровня</option>
                        {
                            bigs.map((b) => <option value={b.id}>{b.abbreviation ? b.abbreviation+" и дочерние" : b.decoding + " и дочерние"}</option>)
                        }
                    </select>
                </div>
            </div>
        <div className="for_btn mt-3 d-flex justify-content-end">
            <div className="adduser" onClick={() => setIsOpenAdd(true)}>Добавить структурное подразделение</div>
        </div>
        {
                isOpenAdd &&
                    <AddStructure closeBlock={setIsOpenAdd}/>
            }
        </>
    );
}

export default  StructureFilters