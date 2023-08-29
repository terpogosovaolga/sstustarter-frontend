import serverURL from "../../serveraddress";

function ProjectAboutAuthor({project}) {
    return (
        <section className="block author halfinner">
            <div className={project.author.avatar_path ? "authorleft" : ""}>
                <h2>Об авторе</h2>
                <div className="text">
                    <p><strong>{project.author.surname +" " + project.author.name + " " + (project.author.patronymic ? project.author.patronymic : "")}</strong> - {project.about_author_text}</p>
                </div>
            </div>
            {project.author.avatar_path && <div className="authorphoto">
                <img src={serverURL + "uploads/" + (project.author.avatar_path ?  project.author.avatar_path : "defaultuser.svg")} alt="" />
            </div>}
        </section>
    );
}

export default ProjectAboutAuthor;