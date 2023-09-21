import { LightningElement, wire ,api} from 'lwc';
import getAccAddress from '@salesforce/apex/GetAddress.getAccAddress';
export default class GoogleMap extends LightningElement {
    @api recordId;
    account;
    error;
    city;
    country;
    postalCode;
    state;
    street;
    mapMarkers = [
        {
            location: {
                City: '\''+this.city+'\'',
                Country: '\''+this.country+'\'',
                PostalCode: '\''+this.postalCode+'\'',
                State: '\''+this.state+'\'',
                Street: '\''+this.street+'\''
            },
            value: 'location001',
            title: 'The Landmark Building',
            description:
                'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
            icon: 'standard:account',
        },
    ];
    zoomLevel = 15;
    @wire(getAccAddress,{recId:'$recordId'})
    methodName(result){
        console.log(result);
        if(result.data){
            this.account=result.data;
            console.log(this.account);
            this.city = this.account.BillingCity; 
            console.log(this.city);
            this.country = this.account.BillingCountry;
            console.log(this.country);
            this.postalCode =this.account.BillingPostalCode;
            console.log(this.postalCode);
            this.state = this.account.BillingState;
            console.log(this.state);
            this.street = this.account.BillingStreet;
            console.log(this.street);
        }
        if(result.error){
            this.error=result.error
            console.log(this.error);
        }
	
	
	}

}