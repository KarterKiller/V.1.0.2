import { LightningElement, api, wire, track } from 'lwc'; // Import des propriétés et classes Apex
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';
import { refreshApex } from '@salesforce/apex'; // Ajout de la fontion refreshApex

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId; // Id du compte passé en paramètre du composant Api
    @track opportunities; // Liste des opportunités à afficher
    @track error; // Variable pour afficher les ereurs. (Effacement des crochets après error) 
    columns = [
        { label: 'Nom Opportunité', fieldName: 'Name', type: 'text' },
        { label: 'Montant', fieldName: 'Amount', type: 'currency' },
        { label: 'Date de Clôture', fieldName: 'CloseDate', type: 'date' },
        { label: 'Phase', fieldName: 'StageName', type: 'text' }
    ];
// Appel de la méthode Apex pour récupérer les opportunités
    @wire(getOpportunities, { accountId: '$recordId' }) //error ( correction effectué) recordId affiche ici les opportunités de compte. 
    wiredOpportunities({ error, data }) {
        if (data) {
            this.opportunities = data;
            this .error = undefined; // Doit contenir des données que lorsqu'une erreur survient. 
        } else if (error) {
            this.error = error;
            this.opportunities = undefined;
        }
    }
    handleRafraichir() {
        refreshApex(this.wiredOpportunitiesResult); // Rafraîchissement des données


}

    }