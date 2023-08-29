

function CustomAlert({text, close}) {
    return (
        <div className='background' onClick={() => {close(false)}}>
            <div className='window'>
                <p style={{marginBottom: "0", textAlign: 'center'}}>{text}</p>
            </div>
        </div>
    )
}

export default CustomAlert;