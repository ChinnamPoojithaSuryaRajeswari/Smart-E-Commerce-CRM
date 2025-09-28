import { LightningElement, api, wire } from 'lwc';
import getCustomerProfile from '@salesforce/apex/OrderController.getCustomerProfile';

export default class CustomerProfile extends LightningElement {
    @api customerId; // Must be passed from parent or record page

    orders = [];
    loyaltyPoints;
    error;

    columns = [
        { label: 'Order Number', fieldName: 'Order_Number_c' }, // Correct field from Apex
        { label: 'Status', fieldName: 'Status__c' },
        { label: 'Amount', fieldName: 'Total_Amount__c', type: 'currency' },
        { label: 'Order Date', fieldName: 'Order_Date__c', type: 'date' },
    ];

    @wire(getCustomerProfile, { customerId: '$customerId' })
    wiredProfile({ data, error }) {
        if (data) {
            this.orders = data.orders || [];
            this.loyaltyPoints = data.loyaltyPoints || 0;
            this.error = undefined;
        } else if (error) {
            this.error = error?.body?.message || JSON.stringify(error);
            this.orders = [];
            this.loyaltyPoints = 0;
        }
    }
}
