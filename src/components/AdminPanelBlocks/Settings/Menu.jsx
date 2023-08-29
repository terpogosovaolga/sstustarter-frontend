function Menu({sec, setSec}) {
    return (
        <div className="mt-5 system-menu d-flex justify-content-between align-items-stretch">
            <div className={sec == 0 ? "card-menu active" : "card-menu"} onClick={() => setSec(0)}>
                Настройки главной страницы сайта
            </div>
            <div  className={sec == 1 ? "card-menu active" : "card-menu"} onClick={() => setSec(1)}>
                Иконки социальных сетей
            </div>
            <div  className={sec == 2 ? "card-menu active" : "card-menu"} onClick={() => setSec(2)}>
                Структурные подразделения
            </div>
            <div  className={sec == 3 ? "card-menu active" : "card-menu"} onClick={() => setSec(3)}>
                Темы
            </div>
        </div>
    );
}

export default Menu;