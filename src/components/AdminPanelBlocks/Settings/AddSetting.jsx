

export default function AddSetting({closeBlock}) {
    return (
        <div className="background">
            <div className="window" style={{backgroundColor: "white", padding: "2rem"}}>
                <h1>Редактирование</h1>
                <input type="file" className="form-control"/>
                        <input type="text" name="name" className="form-control big mt-3" placeholder="Название сайта"/>
                        <input type="text" name="slogan" className="form-control big mt-3"  placeholder="Слоган сайта" />
                        
                        <textarea name="header_description" className="form-control big mt-3" placeholder="Описание" ></textarea>
                <div className="for_btn d-flex justify-content-end align-items-stretch mt-5">
                    <div className="ready">Готово</div>
                    <div className="cancel ml-2rem" onClick={() => closeBlock(false)}>Отмена</div>
                </div>    
            </div>
        </div>
    )
}