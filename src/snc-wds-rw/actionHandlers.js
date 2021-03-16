import {createAmbSubscriptionEffect} from '@servicenow/ui-effect-amb';
import {actionTypes} from '@servicenow/ui-core';

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

const actionHandlers = {
    [COMPONENT_BOOTSTRAPPED]: (coeffects) => {
        const { dispatch, properties } = coeffects;

        const filter = btoa(properties.filter).replace(/=/g, '-');
        const table = properties.table;
        const subscribe = true;
        
        dispatch('RECORD_WATCHER_UPDATED', {
            filter,
            table,
            subscribe
        });
        
    },
    'RECORD_WATCHER_UPDATED': createAmbSubscriptionEffect('/rw/default/:table/:filter', {
        subscribeStartedActionType: 'SUBSCRIPTION_STARTED',
        subscribeSucceededActionType: 'SUBSCRIPTION_SUCCEEDED',
        subscribeFailedActionType: 'SUBSCRIPTION_FAILED',
        messageReceivedActionType: 'MESSAGE_RECEIVED',
        unsubscribeSucceededActionType: 'SUBSCRIPTION_UNSUBSCRIBED'
    }),
    'SUBSCRIPTION_STARTED': {
		effect: (coeffects) => {
			console.log('Subscription Started');
		},
		stopPropagation: true
    },
    'SUBSCRIPTION_SUCCEEDED': {
		effect: (coeffects) => {
			console.log('Subscription Succeeded');
		},
		stopPropagation: true
    },
    'SUBSCRIPTION_FAILED': {
		effect: (coeffects) => {
			console.log('Subscription Failed');
		},
		stopPropagation: true
    },
    'MESSAGE_RECEIVED': {
        effect: (coeffects) => {
            const {action, updateProperties} = coeffects;

			  console.log('Message Received');
        updateProperties(
          {
            data: action.payload.data
          }
        );

		},
		stopPropagation: true
    },
    'SUBSCRIPTION_UNSUBSCRIBED': {
		effect: (coeffects) => {
			console.log('Subscription Unsubscribed');
		},
		stopPropagation: true
	}
};

module.exports = {actionHandlers};