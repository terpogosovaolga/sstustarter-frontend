

export default function AddNet({closeBlock}) {
    return (
        <div className="background">
            <div className="window" style={{backgroundColor: "white", padding: "2rem"}}>
                <h1>Редактирование</h1>
                <input type="file" className="form-control"/>
                        <input type="text" name="name" className="form-control big mt-3" placeholder="Название социальной сети"/>
                        <input type="text" name="link" className="form-control big mt-3"  placeholder="Ссылка" />
                        <label htmlFor="">
                            <input type="checkbox" className="form-check-input" checked style={{marginRight: "1rem"}}/>
                            Сделать активной
                        </label>
                <div className="for_btn d-flex justify-content-end align-items-stretch mt-5">
                    <div className="ready">Готово</div>
                    <div className="cancel ml-2rem" onClick={() => closeBlock(false)}>Отмена</div>
                </div>    
            </div>
        </div>
    )
}