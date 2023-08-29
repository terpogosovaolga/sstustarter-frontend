

export default function AddTheme({closeBlock}) {
    return (
        <div className="background">
            <div className="window" style={{backgroundColor: "white", padding: "2rem"}}>
                <h1>Редактирование</h1>
                <input type="file" className="form-control"/>
                <span className='color-blue'>Фотография необходима только для тем верхнего уровня</span>
                        <input type="text" name="name" className="form-control big mt-3" placeholder="Название темы"/>
                        <select className="form-select big mt-3" >
                            <option value="">Тема-родитель</option>
                            <option value="">Тема верхнего уровня</option>
                            <option value="">Наука</option>
                            <option value="">Общественная жизнь</option>
                            <option value="">Спорт</option>
                        </select>
                <div className="for_btn d-flex justify-content-end align-items-stretch mt-5">
                    <div className="ready">Готово</div>
                    <div className="cancel ml-2rem" onClick={() => closeBlock(false)}>Отмена</div>
                </div>    
            </div>
        </div>
    )
}