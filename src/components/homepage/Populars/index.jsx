import axios from 'axios';
import BigProjectBlock from './BigProjectBlock';
import SmallProjectBlock from './SmallProjectBlock';
import React from 'react';
import serverURL from '../../../serveraddress';
function Populars() {
    
    const [populars, setPopulars] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState([]);
    const bigs_classes = ["right", "left"];
    const [bigLength, setBigLength] = React.useState(0);

    React.useEffect(() => {
        setIsLoading(true);
        axios
            .get(serverURL+"projects/populars/6")
            .then(response => {
                setPopulars(response.data.projects);
                console.log(response.data.projects);
                setIsLoading(false);
                let big_length = response.data.projects.length < 4 ? response.data.projects.length : (response.data.projects.length - 3);
                setBigLength(big_length);
            });
    }, []); // пустой массив рендерит один раз; если внутри переменная, значит следит за ее изменениями

    return(<section>
        <h1 style={{marginBottom: 0}}>Самое посещаемое</h1>
        <div className="projects big d-flex flex-column align-items-start">
            { !isLoading &&
                populars.map((p, i) => {
                    console.log(p);
                    if (i < bigLength) {
                        console.log(i + 'uf!');
                        return <BigProjectBlock key={p.id} classLR={bigs_classes[i%2]} project={p} />
                    } 
                })
            }
        </div>
        <div className="projects small d-flex justify-content-between">
        { !isLoading  && console.log(populars.length) &&
                populars.map((p, i) => {
                    if (i >= bigLength) {
                        <SmallProjectBlock key={p.id} project={p} />
                    }
                })
            }
        </div>

        <div className="forbtn mt-5rem mb-5rem">
            <div className="create_btn">Создать проект</div>
        </div>
    </section>);
}

export default Populars;