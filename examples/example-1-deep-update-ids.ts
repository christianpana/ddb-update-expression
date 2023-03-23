import {ddbDeepUpdateExpression} from "../src/index.js";

const item = {
    "id": "12345",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "addresses": {
        "home": {
            "street": "123 Main St",
            "city": "Anytown",
            "state": "CA",
            "zip": "12345"
        },
        "work": {
            "street": "456 Elm St",
            "city": "Anycity",
            "state": "CA",
            "zip": "67890"
        }
    },
    "phone_numbers": {
        "home": "555-1234",
        "work": "555-5678",
        "cell": "555-9012"
    }
}

const updateExpression = ddbDeepUpdateExpression(item);

console.log(updateExpression)

/* Output:
{
  ExpressionAttributeNames: {
    '#f1': 'id',
    '#f2': 'name',
    '#f3': 'email',
    '#f4': 'addresses',
    '#f5': 'phone_numbers',
    '#f6': 'home',
    '#f7': 'work',
    '#f8': 'cell',
    '#f9': 'state',
    '#f10': 'zip'
  },
  ExpressionAttributeValues: {
    ':v1': '12345',
    ':v2': 'John Doe',
    ':v3': 'johndoe@example.com',
    ':v6': '555-1234',
    ':v7': '555-5678',
    ':v8': '555-9012',
    ':v9': 'CA',
    ':v10': '67890'
  },
  UpdateExpression: 'SET #f1=:v1,#f2=:v2,#f3=:v3,#f4.#f5.#f6=:v6,#f4.#f5.#f7=:v7,#f4.#f5.#f8=:v8,#f4.#f5.#f9=:v9,#f4.#f6.#f7=:v7,#f4.#f6.#f8=:v8,#f4.#f6.#f9=:v9,#f4.#f6.#f10=:v10,#f5.#f6=:v6,#f5.#f7=:v7,#f5.#f8=:v8'
}
*/