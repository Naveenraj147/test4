import { LightningElement } from 'lwc';
import createAccountContactOpportunity from '@salesforce/apex/CreateAccConOppController.createAccountContactOpportunity';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateAcccountContactOpportunity extends LightningElement {
    message;
    newAccount = {'sobjectType' : 'Account'};
    newContact = {'sobjectType' : 'Contact'};
    newOpportunity = {'sobjectType' : 'Opportunity'};

    options=[{ label: 'Prospecting', value: 'Prospecting' },
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Needs Analysis', value: 'Needs Analysis' },
            { label: 'Value Proposition', value: 'Value Proposition' },
            { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
            { label: 'Perception Analysis', value: 'Perception Analysis' },
            { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
            { label: 'Negotiation/Review', value: 'Negotiation/Review' },
            { label: 'Closed Won', value: 'Closed Won' },
            { label: 'Closed Lost', value: 'Closed Lost' },
            ];
handleChange(event){
    if(event.target.name == 'accName'){
        this.newAccount.Name = event.target.value;
    }
    else if(event.target.name == 'accWeb'){
        this.newAccount.Website = event.target.value;
        console.log(this.newAccount);
    }
    else if(event.target.name == 'conName'){
        this.newContact.LastName = event.target.value;
    }
    else if(event.target.name == 'conEmail'){
        this.newContact.Email = event.target.value;
        console.log(this.newContact);
    }
    else if(event.target.name == 'oppName'){
        this.newOpportunity.Name = event.target.value;
    }
    else if(event.target.name == 'oppCloseDate'){
        this.newOpportunity.CloseDate = event.target.value;
    }
    else if(event.target.name == 'oppStage'){
        this.newOpportunity.StageName = event.target.value;
        console.log(this.newOpportunity);
    }
}
handleClick(){
    let createRecord = true;
    console.log(createRecord);
    this.template.querySelectorAll('lightning-input').forEach(element => {
        console.log(element.reportValidity());
        if(element.reportValidity() == false){
            createRecord = false;
        }
        
    });
    console.log(this.template.querySelector('lightning-combobox').reportValidity());
    if(this.template.querySelector('lightning-combobox').reportValidity() == false){

        createRecord = false;
    }
    console.log('final check==>'+createRecord);
    if(createRecord == true){
    createAccountContactOpportunity({newAccount:this.newAccount, newContact:this.newContact, newOpportunity:this.newOpportunity})
    
  
    .then((result)=>{
        this.message=result;
    })
    .catch((error)=>{
        this.message = error;
        console.log('error ===>'+this.message);
    })
    setTimeout(() => {
        if(this.message == 'Successfuly Inserted'){
            this.dispatchEvent( new ShowToastEvent({
                title: 'Toast Success',
                message:'Created Successfully',
                variant :'success',
                mode : 'Dismissable'
            }));
            eval("$A. get('e.force:refreshView').fire();");
        }
        else{
            this.dispatchEvent( new ShowToastEvent({
                title: 'Toast Error',
                message:this.message,
                variant :'error',
                mode : 'Dismissable'
            }));
        }
    }, 1000);

    
    }
}

}