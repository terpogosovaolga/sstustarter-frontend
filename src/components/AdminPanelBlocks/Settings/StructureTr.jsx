import edit from '../../../assets/images/icons/edit.svg';

function StructureTr({structure, index}) {
    
    const getParentString = () => {
        let str = "";
        if (structure.parents)
        {
            for (let i = structure.parents.length - 1; i >= 0; i--) {
                str += structure.parents[i].abbreviation || structure.parents[i].decoding;
                str += " / ";
            }
        }
        str += structure.abbreviation || structure.decoding;
        return str;
    }

    return (
        <tr>
            <td>{index+1}</td>
            <td>{structure.abbreviation}</td>
            <td>{structure.decoding}</td>
            <td>{getParentString()}</td>
            <td>{structure.description}</td>
            <td className="tdedit">
                <img className="toedit" src={edit} alt="" />
            </td>
        </tr>
    );
}

export default StructureTr;