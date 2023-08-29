import axios from "axios";
import { useRef, useState } from "react";
import serverURL from "../../../serveraddress";
import { useSelector } from "react-redux";

export default function NewModerationForm({project_id, close, sended}) {

    const [status, setStatus] = useState(4);
    const [message, setMessage] = useState("");

    const [mistake, setMistake] = useState('Сообщение обязательно при статусе проекта "Возвращен"');
    const ref1 = useRef();
    const ref2 = useRef();

    const userId = useSelector(state => state.auth.userId);

    const check = () => {
        const status_value = ref1.current.value;
        const message_value = ref2.current.value;

        if (status_value == 3 || message_value.length > 0) {
            setMistake("");
        }
        else if (message_value.length == 0) (setMistake('Сообщение обязательно при статусе проекта "'+(status_value == 4 ? 'Возвращен' : 'Удален') +'"'));
        
        setStatus(status_value);
        setMessage(message_value);
    }

    const addModeration = () => {
        if (!mistake) {
            axios.post(serverURL + "moderation/add", {
                project_id: project_id,
                moderator_id: userId,
                status_id: status,
                message: message
            })
            .then(res => {
                if (res.data.success) {
                    close();
                    sended("Модерация проекта успешно выполнена");
                }
            })
        }
    }

    return (
        <>
        <div class="moder">
            <select class="form-select big white" ref={ref1} defaultValue={status} onChange={check}>
                <option value="3">Опубликован</option>
                <option value="4">Возвращен</option>
                <option value="5">Удален</option>
            </select>
            <textarea class="form-control big white mt-3" placeholder="Оставьте комментарий для автора" ref={ref2} defaultValue={message} onChange={check}></textarea>
            {mistake && <span class='color-blue'>{mistake}</span>}
        </div>
        <div class="for_btn d-flex justify-content-end">
            <div class="ready" onClick={addModeration}>Ответить</div>
            <div class="cancel ml-2rem" onClick={close}>Отмена</div>
        </div>
        </>
    );
}