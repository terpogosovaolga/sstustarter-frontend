function ProjectWhoNeed({searchingFor}) {
    return (
        <div className="block need">
                    <h2>Кого ищем</h2>
                    <div className="text">
                        {
                            searchingFor.map((s) => <div key={s.id}><p>{s.text}</p></div>)
                        }
                    </div>
                </div>
    );
}

export default ProjectWhoNeed;