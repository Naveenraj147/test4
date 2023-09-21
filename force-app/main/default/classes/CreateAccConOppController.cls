public with sharing class CreateAccConOppController {
    @AuraEnabled
    public static string createAccountContactOpportunity(Account newAccount,Contact newContact,Opportunity newOpportunity){
        String errorMsg;
        Savepoint sp = Database.setSavepoint();
        try {
            Account acc = new Account();
            acc.Name = newAccount.Name;
            acc.Website = newAccount.Website;
            insert acc;
            Contact con = new Contact();
            con.LastName = newContact.LastName;
            con.AccountId = acc.Id;
            con.Email = newContact.Email;
            insert con;
            Opportunity opp = new Opportunity();
            opp.Name = newOpportunity.Name;
            opp.AccountId = acc.Id;
            opp.ContactId = con.Id;
            opp.CloseDate = newOpportunity.CloseDate;
            opp.StageName = newOpportunity.StageName;
            insert opp;
            

            return 'Successfuly Inserted';
        } 
        catch (Exception e) {
            Database.rollback( sp );
            errorMsg = e.getMessage();
            return errorMsg.substringAfter('_EXCEPTION,');
        }
}
}