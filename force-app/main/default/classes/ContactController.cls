public with sharing class ContactController {
    public ContactController() {

    }
    @AuraEnabled(cacheable=true)
    public static list<contact> getContacts(){
        list<contact> contactList = [Select id ,LastName, Email, Account.Name from Contact Limit 10];
        return contactList;
    }
}
