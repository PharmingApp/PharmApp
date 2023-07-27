export default {
    Medicines : {
        primaryKey: 'ID', // Unique identifier, must be int
        Name: 'Name',
        Price: 'Price',
        quantityInStock: 'Quantity',
    },

    Invoices : {
        primaryKey: 'ID',
        SubTotal: 'SubTotal'
    }, 

    Purchases : {
        InvoiceID: 'InvoiceID',
        MedicineID: 'MedicineID',
        Quantity: 'Quantity',
        FormerPrice: 'FormerPrice'
    },
    
    // For medicines table, Column Name : Data Type 
    // Possible types are all html types mentioned here at https://www.w3schools.com/html/html_form_input_types.asp
    // If not mentioned, it is assumed to be text
    // Define here for all rows, ESPECIALLY for numbers that are integers
    inputType : { 
        Price: "number",
        Quantity: "number"
    }
}