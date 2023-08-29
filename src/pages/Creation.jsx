import { createContext, useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LevelOne from '../components/CreationBlocks/LevelOne';
import LevelTwo from '../components/CreationBlocks/LevelTwo';
import LevelThree from '../components/CreationBlocks/LevelThree';
import BackButton from '../components/CreationBlocks/BackButton';
import { useDispatch, useSelector } from "react-redux";
import { setStep, getProject, setAction } from "../redux/slices/creationSlice";
import { useSearchParams } from "react-router-dom";
import PageNotFound from './PageNotFound';
function Creation() {

    const [searchParams, setSearchParams] = useSearchParams();
    const url_edit = searchParams.get("edit");
    const project_id = searchParams.get("id");

    const step = useSelector(state => state.creation.step);
    const author_id = useSelector(state => state.creation.author_id);
    const user_id = useSelector(state => state.auth.userId);
    const action = useSelector(state => state.creation.action);
    
    const dispatch = useDispatch();
    if (url_edit && project_id) {
        console.log('editing ' + project_id);
        dispatch(getProject(parseInt(project_id)));
    }

    if (url_edit && project_id && user_id !== author_id) {
        return <PageNotFound />
    } else if (url_edit && project_id){
        dispatch(setAction('Редактирование'));
    }

    return (
        <>
            <Header />
                <main>
                    <div className="container">
                    <h4>{action} проекта</h4>
                    <p>Шаг <span className="step">{step}</span>/3</p>
                    {
                        step !== 1 && <span className='back level' onClick={() =>{ dispatch(setStep(step-1))}}>Назад</span>
                    }
                        {
                            step === 1 && <LevelOne />
                        }
                        {
                            step === 2 && <LevelTwo />
                        }
                        {
                            step === 3 && <LevelThree id={project_id}/>
                        }
                        
                    </div>
                </main>
            <Footer />
        </>
    )
}

export default Creation;