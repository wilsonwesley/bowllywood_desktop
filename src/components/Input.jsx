import './Input.scss';

const InputText = (props) => {
    return (
        <div className="inputCtnr w-100 px-0 my-3">
            <label htmlFor={props.name} className="w-100">
                {props.desc}
            </label>
            <input className="no-border w-100 py-2 ps-3" {...props} />
            <p className="error">
                {props.error}
            </p>
        </div>
    );
};

export default InputText;
