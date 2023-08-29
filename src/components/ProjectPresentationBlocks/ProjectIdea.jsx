function ProjectIdea({project}) {
    return (
        <section className="block idea">
                <h2>Идея</h2>
                <div className="text">
                    <p>{project.idea_text}</p>
                </div>
            </section>
    );
}

export default ProjectIdea;