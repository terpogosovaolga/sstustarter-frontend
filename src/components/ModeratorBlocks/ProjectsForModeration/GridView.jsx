import serverURL from "../../../serveraddress";
import ProjectBlock from "./ProjectBlock";

export default function GridView({projects}) {
    return (<div className="grid-projects mt-3">
    <div className="projects d-flex justify-content-between flex-wrap">
        {
            projects.map((p,i) => <ProjectBlock project={p} index={i}/>)
        }
    </div>
</div>)
}