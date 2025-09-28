import { LightningElement, track, wire } from 'lwc';
import fetchCustomers from '@salesforce/apex/CustomerAPIService.fetchCustomers';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle } from 'lightning/platformResourceLoader';

const columns = [
    { label: 'ID', fieldName: 'id' },
    { label: 'First Name', fieldName: 'first_name' },
    { label: 'Last Name', fieldName: 'last_name' },
    { label: 'Email', fieldName: 'email' }
];

export default class CustomerList extends LightningElement {
    @track customers;
    @track error;
    columns = columns;

    @wire(fetchCustomers)
    wiredCustomers({ error, data }) {
        if(data){
            this.customers = data;
            this.error = undefined;
        } else if(error){
            this.error = 'Unable to fetch customer data';
            this.customers = undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body ? error.body.message : error,
                    variant: 'error'
                })
            );
        }
    }
}