import {ddbUpdateExpression} from "../src/index.js";

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

const updateExpression = ddbUpdateExpression(item);

console.log(updateExpression)

/* Output:
{
  "UpdateExpression": "SET #f_id=:v_id,#f_name=:v_name,#f_email=:v_email,#f_addresses=:v_addresses,#f_phone_numbers=:v_phone_numbers",
  "ExpressionAttributeNames": {
    "#f_id": "id",
    "#f_name": "name",
    "#f_email": "email",
    "#f_addresses": "addresses",
    "#f_phone_numbers": "phone_numbers"
  },
  "ExpressionAttributeValues": {
    ":v_id": "12345",
    ":v_name": "John Doe",
    ":v_email": "johndoe@example.com",
    ":v_addresses": {
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
    ":v_phone_numbers": {
      "home": "555-1234",
      "work": "555-5678",
      "cell": "555-9012"
    }
  }
}
*/