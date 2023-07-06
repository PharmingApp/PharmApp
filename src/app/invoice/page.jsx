import InvoiceTable from "../../components/InvoiceTable";

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

    return(
        <InvoiceTable data={data} searchFor={'name'} primaryKey={"id"}/>
    )
}

