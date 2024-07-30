public with sharing class AccountCasesController {

    @AuraEnabled
    public static List<Case> findCasesBySubject(String searchTerm) {
        // Initialisation de la liste des cas
        List<Case> cases = new List<Case>();
        

            // Si le terme de recherche n'est pas vide, effectuer la requête SOQL
            if (String.isNotBlank(searchTerm)) {
                cases = [
                    SELECT Id, Subject, Status, Priority 
                    FROM Case 
                    WHERE Subject LIKE :('%' + searchTerm + '%')
                ];
            }
        

        // Retourner la liste des cases
        return cases; 
    
    }

}

