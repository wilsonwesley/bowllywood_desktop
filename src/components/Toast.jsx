import Toast from 'react-bootstrap/Toast'

const MessageToast = (props) => {
    return (
        <>
            <Toast
                className="d-inline-block m-1"
                bg={props.variant.toLowerCase()}
            >
                <Toast.Header>
                    <strong className="me-auto">{props.messageType}</strong>
                    <small>{props.messageSource}</small>
                </Toast.Header>
                <Toast.Body className={props.variant === 'Dark' && 'text-white'}>
                    Hi!
                </Toast.Body>
            </Toast>
        </>
    );
};

export default MessageToast;
