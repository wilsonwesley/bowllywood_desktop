import './SimplePopup.scss'
import { useState } from 'react';
import Popup from 'react-popup';

const SimplePopup = (title, message) => {
	const onClose = (store) => {
		store.popups = {};
		Popup.clearQueue();
		Popup.close();
	}
	
    Popup.create({
        title: title,
        content: message,
        buttons: {
            right: [{
                text: 'Ok pour moi !',
                key: 'Enter',
                action: onClose,
            }]
        }
    }, true)
}

export default SimplePopup