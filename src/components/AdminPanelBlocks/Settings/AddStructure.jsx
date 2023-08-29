export default function AddStructure({closeBlock}) {
    return (
        <div className="background">
            <div className="window" style={{backgroundColor: "white", padding: "2rem"}}>
                <h1>Редактирование</h1>
                {/* <input type="file" className="form-control"/> */}
                        <input type="text" name="name" className="form-control big mt-3" placeholder="Аббревиатура"/>
                        <input type="text" name="link" className="form-control big mt-3"  placeholder="Расшифровка" />
                        <select className="form-select big mt-3" >
                            <option value="">Структура-родитель</option>
                            <option value="">ИнПИТ</option>
                            <option value="">ИнЭТИП</option>
                            <option value="">ИнЭН</option>
                            <option value="">СЭИ</option>
                        </select>
                <div className="for_btn d-flex justify-content-end align-items-stretch mt-5">
                    <div className="ready">Готово</div>
                    <div className="cancel ml-2rem" onClick={() => closeBlock(false)}>Отмена</div>
                </div>    
            </div>
        </div>
    )
}