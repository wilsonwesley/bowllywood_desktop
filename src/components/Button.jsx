import './Button.scss';

const Button = ({type='button', bsType='primary', id=null, onClick=null, children}) => {
    return (
        <>
            <button id={id} type={type} className={`btn btn-${bsType} text-dark`} onClick={onClick}>{children}</button>
        </>
    );
}

export default Button;