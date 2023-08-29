import arrowleft from '../../assets/images/icons/arrowleft.png';

function BackButton() {
    return (
        <div className='back level'>
            <img src={arrowleft} alt="" />
        </div>
    );
}

export default BackButton;