import ProjectTr from "./ProjectTr";

export default function TableView({projects}) {
    return(
        <div className="table-projects mt-3">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>№ модерации</th>
                        <th>Автор</th>
                        <th>Название</th>
                        <th>Тема</th>
                        <th>Дата создания</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((p, i) => <ProjectTr key={p.id} project={p} index={i} />)
                    }
                </tbody>
            </table>
        </div>
    )
}