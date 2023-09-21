public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitieslwc(String accId){
       
        return [Select Id, Name, Account.Name, StageName, Amount, CloseDate, Owner.Name, LastStageChangeDate From Opportunity Where AccountId =:accId AND StageName = 'Qualification'];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAllOpportunitieslwc(){
        return [Select Id, Name, Account.Name, StageName, Amount, CloseDate, Owner.Name, LastStageChangeDate From Opportunity Where StageName = 'Qualification'];
    }
}
