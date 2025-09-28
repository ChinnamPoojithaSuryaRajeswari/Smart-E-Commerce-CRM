import { LightningElement, api, wire } from 'lwc';
import getOrderTracking from '@salesforce/apex/OrderController.getOrderTracking';

export default class OrderTrackingList extends LightningElement {
    @api orderId; // Pass the order Id from parent component
    trackingData;
    error;

    @wire(getOrderTracking, { orderId: '$orderId' })
    wiredTracking({ error, data }) {
        if(data) {
            this.trackingData = data;
            this.error = undefined;
        } else if(error) {
            this.error = error.body.message;
            this.trackingData = undefined;
        }
    }
}