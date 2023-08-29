import user from '../../../assets/images/icons/user.svg';
import arrow from '../../../assets/images/icons/arrowright2.svg';
import serverURL from '../../../serveraddress';
function SmallProjectBlock({ project }) {
    let image = serverURL+"uploads/"+project.main_photo.path;
    let date = new Date(project.plandate_step_end);
    return (
        <div className="project">
                <div className="img" style={{backgroundImage: "url("+image+")"}}></div>
                <div className="info">
                    <h3>{project.name}</h3>
                    <p className="author"><a><img src={user} alt="" /> <span>{project.author.surname + " " + project.author.name}</span></a></p>
                    <img className="more" src={arrow} alt="" />
                </div>
                <div className="category">
                    <img src={serverURL+"uploads/"+project.theme[project.theme.length - 1].path} alt="" />
                </div>
            </div>
    );
}

export default SmallProjectBlock;