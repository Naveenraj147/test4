import { LightningElement, wire} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class DataTable extends LightningElement {
    sortBy;
    sortDirection ='asc';
    actions = [{label:'Show Details',name:'Details'},
                {label:'Delete',name:'Delete'},]
    columnsList = [{label:'Contact Name',fieldName:'LastName',
                    cellAttributes:{
                        iconName:'standard:contact',
                        iconPosition:'left',
                        iconAlternativeText:'contact icon'
                    },sortable:true},
                    {label:'Account Name',fieldName:'AccountUrl',type:'url',
                    typeAttributes:{
                    label:{fieldName:'AccountName'},
                    Target:'_Blank'},sortable:true},
                    {label:'Email',fieldName:'Email'},
                    {label:'Id',fieldName:'Id',sortable:true},
                    {type:'button',fixedWidth:150,
                    typeAttributes:{
                        label:'View Details',
                        title:'View Details',
                        name:'Details',
                        value:'Details',
                        variant:'brand',
                        class:'scaled-down'
                    }},
                    {type:'action',typeAttributes:{rowActions:this.actions}}];
        
    contacts;
    error;
    

@wire(getContacts)
getContacts(result){
    if(result.data){
        let parseData = JSON.parse(JSON.stringify(result.data));
        let baseUrl ='https://'+location.host+'/';
        parseData.forEach(element => {
            element.AccountName = element.Account.Name;
            element.AccountUrl = baseUrl+element.Account.Id;
        });
        this.contacts = parseData;
        this.error = undefined;
        console.log('contacts',this.contacts);
    }
    if(result.error){
        this.contacts = undefined;
        this.error = result.error;
    }
}
handleAction(event){
    const action = event.detail.action;
    const row = event.detail.row;
    switch (action.name)
    {
        case 'Details': {
            alert(JSON.stringify(row));
            break;
        }
        case 'Delete': {
            alert(JSON.stringify(row));
            break; 
        }
    }
}
handleSort(event){
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sorting(event.detail.fieldName,event.detail.sortDirection); 
}
sorting(fieldname, direction){

    let parseData = JSON.parse(JSON.stringify(this.contacts));
    let keyvalue=(a)=>{
        console.log(a[fieldname]);
    return a[fieldname]};
    let isReverse = direction ==='asc' ? 1:-1;
    parseData.sort((x,y)=>{
    x=keyvalue(x) ? keyvalue(x):' ';
    y=keyvalue(y) ? keyvalue(y):' ';
    return isReverse *((x>y) - (y>x));
    });
    this.contacts = parseData;
    }
    
}