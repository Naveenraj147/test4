public class GetAddress {
    @AuraEnabled(cacheable=true)
    public static Account getAccAddress(String recId) {
        
        Account acc =  [Select BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry FROM Account where Id =:recId];
        return acc;
    }
}