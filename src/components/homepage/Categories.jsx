import { useNavigate } from "react-router-dom";
import serverURL from "../../serveraddress";

function Categories({categories}) {
    
    let images = categories.map(cat => serverURL+"uploads/"+cat.path);
    console.log(images);
    const navigate = useNavigate();
    return (
        <section>
            <h1>Что Вам интересно?</h1>
            <div className="themes_container d-flex justify-content-between align-items-stretch">
                {
                    categories.map((c, i) => (
                        <div key={c.id} className="theme" style={{backgroundImage: "url("+ images[i] +")"}} onClick={() => navigate("/catalog?theme="+c.name)}>
                            <p>{c.name}</p>
                        </div>))
                }
                
            </div>
        </section>
    );
}

export default Categories;