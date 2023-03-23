# ddb-update-expression
`ddb-update-expression` is a versatile npm package designed to simplify the process of generating update expressions 
for DynamoDB. This package streamlines the creation of update expressions, expression attribute names, and expression 
attribute values, making it easier to update items within a DynamoDB table.

The package offers two distinct modes:
1. **DDB Update Expression** (`ddbUpdateExpression`): This mode is suitable for updating both simple and nested items in DynamoDB. However, when updating nested objects, it replaces the entire object rather than updating individual values within the object. This mode is ideal for situations where updating the entire nested object is the desired outcome.
2. **DDB Deep Update Expression** (`ddbDeepUpdateExpression`): This mode is particularly useful for updating deeply nested values in a DynamoDB item, allowing you to modify individual values without replacing the entire object.

While `ddb-update-expression` enables updates to individual values within nested objects, it does not support deleting individual values.

# Installation
To install the ddb-update-expression package, use the following command:
```bash
npm install ddb-update-expression
```

# Usage
## ddbUpdateExpression
```js
import { ddbUpdateExpression } from 'ddb-update-expression'
const item = { /* ... */ }
const updateExpression = ddbUpdateExpression(item);
console.log(updateExpression)
```
## ddbDeepUpdateExpression
```js
import { ddbDeepUpdateExpression } from 'ddb-update-expression'
const item = { /* ... */ }
const updateExpression = ddbDeepUpdateExpression(item);
console.log(updateExpression)
```

# Examples
Check `examples` directory on GitHub.

# Sample output
## DDB Update Expression
#### Item
```json
{
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
```

#### Update expression
```json
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
```

## DDB Deep Update Expression
#### Item
```json
{
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
```

#### Update expression (with IDs - default)
```json
{
  "ExpressionAttributeNames": {
    "#f1": "id",
    "#f2": "name",
    "#f3": "email",
    "#f4": "addresses",
    "#f5": "phone_numbers",
    "#f6": "home",
    "#f7": "work",
    "#f8": "cell",
    "#f9": "state",
    "#f10": "zip"
  },
  "ExpressionAttributeValues": {
    ":v1": "12345",
    ":v2": "John Doe",
    ":v3": "johndoe@example.com",
    ":v6": "555-1234",
    ":v7": "555-5678",
    ":v8": "555-9012",
    ":v9": "CA",
    ":v10": "67890"
  },
  "UpdateExpression": "SET #f1=:v1,#f2=:v2,#f3=:v3,#f4.#f5.#f6=:v6,#f4.#f5.#f7=:v7,#f4.#f5.#f8=:v8,#f4.#f5.#f9=:v9,#f4.#f6.#f7=:v7,#f4.#f6.#f8=:v8,#f4.#f6.#f9=:v9,#f4.#f6.#f10=:v10,#f5.#f6=:v6,#f5.#f7=:v7,#f5.#f8=:v8"
}
```

#### Update expression (with names - debug option)
```json
{
  "ExpressionAttributeNames": {
    "#f_id": "id",
    "#f_name": "name",
    "#f_email": "email",
    "#f_addresses": "addresses",
    "#f_addresses_home": "home",
    "#f_addresses_home_street": "street",
    "#f_addresses_home_city": "city",
    "#f_addresses_home_state": "state",
    "#f_addresses_home_zip": "zip",
    "#f_addresses_work": "work",
    "#f_addresses_work_street": "street",
    "#f_addresses_work_city": "city",
    "#f_addresses_work_state": "state",
    "#f_addresses_work_zip": "zip",
    "#f_phone_numbers": "phone_numbers",
    "#f_phone_numbers_home": "home",
    "#f_phone_numbers_work": "work",
    "#f_phone_numbers_cell": "cell"
  },
  "ExpressionAttributeValues": {
    ":v_id": "12345",
    ":v_name": "John Doe",
    ":v_email": "johndoe@example.com",
    ":v_addresses_home_street": "123 Main St",
    ":v_addresses_home_city": "Anytown",
    ":v_addresses_home_state": "CA",
    ":v_addresses_home_zip": "12345",
    ":v_addresses_work_street": "456 Elm St",
    ":v_addresses_work_city": "Anycity",
    ":v_addresses_work_state": "CA",
    ":v_addresses_work_zip": "67890",
    ":v_phone_numbers_home": "555-1234",
    ":v_phone_numbers_work": "555-5678",
    ":v_phone_numbers_cell": "555-9012"
  },
  "UpdateExpression": "SET #f_id=:v_id,#f_name=:v_name,#f_email=:v_email,#f_addresses.#f_addresses_home.#f_addresses_home_street=:v_addresses_home_street,#f_addresses.#f_addresses_home.#f_addresses_home_city=:v_addresses_home_city,#f_addresses.#f_addresses_home.#f_addresses_home_state=:v_addresses_home_state,#f_addresses.#f_addresses_home.#f_addresses_home_zip=:v_addresses_home_zip,#f_addresses.#f_addresses_work.#f_addresses_work_street=:v_addresses_work_street,#f_addresses.#f_addresses_work.#f_addresses_work_city=:v_addresses_work_city,#f_addresses.#f_addresses_work.#f_addresses_work_state=:v_addresses_work_state,#f_addresses.#f_addresses_work.#f_addresses_work_zip=:v_addresses_work_zip,#f_phone_numbers.#f_phone_numbers_home=:v_phone_numbers_home,#f_phone_numbers.#f_phone_numbers_work=:v_phone_numbers_work,#f_phone_numbers.#f_phone_numbers_cell=:v_phone_numbers_cell"
}
```