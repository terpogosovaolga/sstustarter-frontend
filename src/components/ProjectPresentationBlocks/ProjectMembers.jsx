import serverURL from "../../serveraddress";

function ProjectMembers({members,  openQuery}) {
    return (
        <div className="block members">
            <h2 className="right">Уже в проекте</h2>
            <div className="text">
                <div className="mems d-flex justify-content-between align-items-center flex-wrap">
                    {
                        members.map((m, i) => {
                            if (i < 4) {
                                return (<div className="person" key={m.id}>
                                    <div className="img" style={{backgroundImage: "url("+serverURL + "uploads/" + (m.avatar_path ?  m.avatar_path : "defaultuser.svg")+")"}}></div>
                                    <p>{m.surname}<br />{m.name}</p>
                                </div>)
                            }
                        })
                    }
                    
                </div>
                {members.length > 4 &&  <p className="text-center">еще {members.length - 4}</p>}
                <div className="create_btn" onClick={() => openQuery(true)}>Подать заявку</div>
            </div>
        </div>
    );
}

export default ProjectMembers;