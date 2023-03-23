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

const updateExpression = ddbDeepUpdateExpression(item, { debug: true });

console.log(JSON.stringify(updateExpression))

/* Output:
{
  ExpressionAttributeNames: {
    '#f_id': 'id',
    '#f_name': 'name',
    '#f_email': 'email',
    '#f_addresses': 'addresses',
    '#f_addresses_home': 'home',
    '#f_addresses_home_street': 'street',
    '#f_addresses_home_city': 'city',
    '#f_addresses_home_state': 'state',
    '#f_addresses_home_zip': 'zip',
    '#f_addresses_work': 'work',
    '#f_addresses_work_street': 'street',
    '#f_addresses_work_city': 'city',
    '#f_addresses_work_state': 'state',
    '#f_addresses_work_zip': 'zip',
    '#f_phone_numbers': 'phone_numbers',
    '#f_phone_numbers_home': 'home',
    '#f_phone_numbers_work': 'work',
    '#f_phone_numbers_cell': 'cell'
  },
  ExpressionAttributeValues: {
    ':v_id': '12345',
    ':v_name': 'John Doe',
    ':v_email': 'johndoe@example.com',
    ':v_addresses_home_street': '123 Main St',
    ':v_addresses_home_city': 'Anytown',
    ':v_addresses_home_state': 'CA',
    ':v_addresses_home_zip': '12345',
    ':v_addresses_work_street': '456 Elm St',
    ':v_addresses_work_city': 'Anycity',
    ':v_addresses_work_state': 'CA',
    ':v_addresses_work_zip': '67890',
    ':v_phone_numbers_home': '555-1234',
    ':v_phone_numbers_work': '555-5678',
    ':v_phone_numbers_cell': '555-9012'
  },
  UpdateExpression: 'SET #f_id=:v_id,#f_name=:v_name,#f_email=:v_email,#f_addresses.#f_addresses_home.#f_addresses_home_street=:v_addresses_home_street,#f_addresses.#f_addresses_home.#f_addresses_home_city=:v_addresses_home_city,#f_addresses.#f_addresses_home.#f_addresses_home_state=:v_addresses_home_state,#f_addresses.#f_addresses_home.#f_addresses_home_zip=:v_addresses_home_zip,#f_addresses.#f_addresses_work.#f_addresses_work_street=:v_addresses_work_street,#f_addresses.#f_addresses_work.#f_addresses_work_city=:v_addresses_work_city,#f_addresses.#f_addresses_work.#f_addresses_work_state=:v_addresses_work_state,#f_addresses.#f_addresses_work.#f_addresses_work_zip=:v_addresses_work_zip,#f_phone_numbers.#f_phone_numbers_home=:v_phone_numbers_home,#f_phone_numbers.#f_phone_numbers_work=:v_phone_numbers_work,#f_phone_numbers.#f_phone_numbers_cell=:v_phone_numbers_cell'
}
*/