import serverURL from "../../serveraddress";

function ProjectGoals({goals}) {
    return (
        <section className="goals block">
            <h2>Цели</h2>
            <div className="text d-flex justify-content-between align-items-stretch flex-wrap">
                {  goals.length > 0 && 
                    goals.map((g) => {
                        return g ? (
                            <div key={g.id} className="goal d-flex justify-content-end align-items-stretch flex-column">
                    <p>{g.text}</p>

                    {g.photo && g.photo.path && <img src={serverURL + "uploads/"+ g.photo.path} alt="" />
}
                    <span>{g.number_of_goal}</span>
                </div>
                        ) : ""
                    })
                }
                
            </div>
        </section>
    );
}

export default ProjectGoals