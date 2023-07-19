export default {
    Medicines : {
        primaryKey: 'ID', // Unique identifier
        Name: 'name',
        Price: 'price',
        quantityInStock: 'quantity',
    },

    // For medicines table, Column Name : Data Type 
    // Possible types are all html types mentioned here at https://www.w3schools.com/html/html_form_input_types.asp
    // If not mentioned, it is assumed to be text
    // Define here for all rows, ESPECIALLY for numbers that are integers
    inputType : { 
        Price: "number",
        quantity: "number"
    }
}