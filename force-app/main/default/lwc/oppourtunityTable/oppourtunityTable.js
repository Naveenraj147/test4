import { LightningElement, wire, api, track} from 'lwc';

import getOpportunitieslwc from '@salesforce/apex/OpportunityController.getOpportunitieslwc';
import getAllOpportunitieslwc from '@salesforce/apex/OpportunityController.getAllOpportunitieslwc';
export default class OppourtunityTable extends LightningElement {
    @api recordId;
    @track accounts;
    error;
    columns = [
        { label: 'Opportunity Name', fieldName: 'Name' },
        { label: ' Account Name', fieldName: 'AccountName' },
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Amount', fieldName: 'Amount' },
        { label: 'Close Date', fieldName: 'CloseDate' },
        { label: 'Opportunity Owner', fieldName: 'OwnerName' },
    ];
    
    @wire(getOpportunitieslwc,{accId:'$recordId'})
functionName(result){
    if(result.data){
        this.accounts = result.data.map(
            record => Object.assign(
              { "AccountName": record.Account.Name, "OwnerName" : record.Owner.Name},
              record
              )
              );
        console.log('Accounts==>'+JSON.stringify(this.accounts));
    }
    

   else if(result.error){
    this.error=result.error;
    console.log('Error==>'+JSON.stringify( this.error));
   }
	
	}
    
    @wire(getAllOpportunitieslwc)
    FunctionName(result){
    this.accounts=result.data;
    this.error=result.error;
    }



}