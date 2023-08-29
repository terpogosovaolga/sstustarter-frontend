import { useState } from "react";
import AddTheme from "./AddTheme";

function ThemesFilters({bigs}) {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    return (
        <>
        <div class="users-filters mt-3 d-flex justify-content-between align-items-center">
                <div>
                    <input type="text" class="form-control big " name="search" placeholder="Поиск по названию" />
                </div>
                <div>
                    <select class="form-select big" name="parent">
                        <option value="">Все темы</option>
                        <option value="0">Только основные</option>
                        {
                            bigs.map(b => <option value={b.id}>{b.name} и дочерние</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="for_btn mt-3 d-flex justify-content-end">
            <div className="adduser"  onClick={() => setIsOpenAdd(true)}>Добавить тему</div>
        </div>
        {
            isOpenAdd && 
            <AddTheme  closeBlock={setIsOpenAdd}/> 
        }
        </>
    )
}
export default ThemesFilters;