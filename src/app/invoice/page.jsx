import InvoiceTable from "../../components/InvoiceTable";
import fs from 'fs'
import YAML from 'yaml'

export default function Page(){
    const data = {
        1: {
            "name": "Apple iPhone 13 Pro Max",
            "price": 1_199.99,
            "quantity": 10,
        },
        2: {
            "name": "Samsung Galaxy S22 Ultra",
            "price": 1_199.99,
            "quantity": 5,
        },
        3: {
            "name": "Google Pixel 6 Pro",
            "price": 899.99,
            "quantity": 15,
        },
        4: {
            "name": "MacBook Pro 14",
            "price": 1_999.99,
            "quantity": 20,
        },
        5: {
            "name": "iPad Pro 12.9",
            "price": 1_099.99,
            "quantity": 30,
        },
        6: {
            "name": "AirPods Pro",
            "price": 249.99,
            "quantity": 40,
        },
        7: {
            "name": "Apple Watch Series 7",
            "price": 399.99,
            "quantity": 50,
        },
        8: {
            "name": "Beats Studio Buds",
            "price": 149.99,
            "quantity": 60,
        },
        9: {
            "name": "AirTag",
            "price": 99.99,
            "quantity": 70,
        },
        10: {
            "name": "Apple TV 4K",
            "price": 199.99,
            "quantity": 80,
        },
    }

    let file = fs.readFileSync('./src/config.yaml', 'utf8')
    let primaryKey = YAML.parse(file).Medicines.primaryKey
    let searchFor = YAML.parse(file).Medicines.Name
    let totalQuantity = YAML.parse(file).Medicines.quantityInStock
    let itemPrice = YAML.parse(file).Medicines.Price

    return(
        <InvoiceTable data={data} searchFor={searchFor} primaryKey={primaryKey} totalQuantity={totalQuantity} itemPrice={itemPrice}/>
    )
}

