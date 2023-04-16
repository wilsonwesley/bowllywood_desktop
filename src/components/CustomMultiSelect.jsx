import Multiselect from 'react-widgets/Multiselect'
import './Input.scss';
import './CustomMultiSelect.scss'

const CustomMultiSelect = (props) => {
    return (
        <div className="inputCtnr w-100 px-0 my-3">
            <label htmlFor={props.name} className="w-100">
                {props.desc}
            </label>
            <Multiselect
                className="no-border w-100 py-2 pl-3" {...props}
            />
            <p className="error">
                {props.error}
            </p>
        </div>
    );
};

export default CustomMultiSelect;
