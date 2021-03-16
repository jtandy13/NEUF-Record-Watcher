import {createCustomElement} from '@servicenow/ui-core';
import {actionHandlers} from './actionHandlers';

createCustomElement('snc-wds-rw', {
	actionHandlers: {...actionHandlers},
	properties: {
		filter: { 
			default: '',
			required: true
		},
		table: { 
			default: '',
			required: true, 
		},
		data: {
			default: {},
			selectable: true
		}
	}
})
