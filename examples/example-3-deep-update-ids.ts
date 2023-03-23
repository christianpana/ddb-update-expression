import {ddbDeepUpdateExpression} from "../src/index.js";

const item = {
    "order_id": "abc123",
    "customer": {
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "phone_numbers": {
            "home": "555-1234",
            "work": "555-5678"
        },
        "addresses": {
            "billing": {
                "street": "123 Main St",
                "city": "Anytown",
                "state": "CA",
                "zip": "12345"
            },
            "shipping": {
                "street": "456 Elm St",
                "city": "Anycity",
                "state": "CA",
                "zip": "67890"
            }
        }
    },
    "item": {
        "product_id": "p001",
        "product_name": "Widget",
        "price": 9.99,
        "quantity": 2
    }
}

const updateExpression = ddbDeepUpdateExpression(item);

console.log(updateExpression)

/* Output:
{
  ExpressionAttributeNames: {
    '#f1': 'order_id',
    '#f2': 'customer',
    '#f3': 'item',
    '#f4': 'product_id',
    '#f5': 'product_name',
    '#f6': 'price',
    '#f7': 'quantity',
    '#f8': 'shipping',
    '#f9': 'street',
    '#f10': 'city',
    '#f11': 'state',
    '#f12': 'zip'
  },
  ExpressionAttributeValues: {
    ':v1': 'abc123',
    ':v3': 'Jane Doe',
    ':v4': 'p001',
    ':v6': 9.99,
    ':v7': 2,
    ':v8': '123 Main St',
    ':v9': '456 Elm St',
    ':v10': 'Anycity',
    ':v11': 'CA',
    ':v12': '67890',
    ':v5': 'Widget'
  },
  UpdateExpression: 'SET #f1=:v1,#f2.#f3=:v3,#f2.#f4=:v4,#f2.#f5.#f6=:v6,#f2.#f5.#f7=:v7,#f2.#f6.#f7.#f8=:v8,#f2.#f6.#f7.#f9=:v9,#f2.#f6.#f7.#f10=:v10,#f2.#f6.#f7.#f11=:v11,#f2.#f6.#f8.#f9=:v9,#f2.#f6.#f8.#f10=:v10,#f2.#f6.#f8.#f11=:v11,#f2.#f6.#f8.#f12=:v12,#f3.#f4=:v4,#f3.#f5=:v5,#f3.#f6=:v6,#f3.#f7=:v7'
}
*/