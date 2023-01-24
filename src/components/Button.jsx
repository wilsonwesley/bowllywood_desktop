import './../sass/styles.scss';

const Button = ({type='button', bsType='primary', children}) => {

    return (
        <>
            <button type={type} className={`btn btn-${bsType} text-black`}>{children}</button>            
        </>
    );
}

export default Button;