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

const updateExpression = ddbDeepUpdateExpression(item, { debug: true });

console.log(updateExpression)

/* Output:
{
  ExpressionAttributeNames: {
    '#f_order_id': 'order_id',
    '#f_customer': 'customer',
    '#f_customer_name': 'name',
    '#f_customer_email': 'email',
    '#f_customer_phone_numbers': 'phone_numbers',
    '#f_customer_phone_numbers_home': 'home',
    '#f_customer_phone_numbers_work': 'work',
    '#f_customer_addresses': 'addresses',
    '#f_customer_addresses_billing': 'billing',
    '#f_customer_addresses_billing_street': 'street',
    '#f_customer_addresses_billing_city': 'city',
    '#f_customer_addresses_billing_state': 'state',
    '#f_customer_addresses_billing_zip': 'zip',
    '#f_customer_addresses_shipping': 'shipping',
    '#f_customer_addresses_shipping_street': 'street',
    '#f_customer_addresses_shipping_city': 'city',
    '#f_customer_addresses_shipping_state': 'state',
    '#f_customer_addresses_shipping_zip': 'zip',
    '#f_item': 'item',
    '#f_item_product_id': 'product_id',
    '#f_item_product_name': 'product_name',
    '#f_item_price': 'price',
    '#f_item_quantity': 'quantity'
  },
  ExpressionAttributeValues: {
    ':v_order_id': 'abc123',
    ':v_customer_name': 'Jane Doe',
    ':v_customer_email': 'janedoe@example.com',
    ':v_customer_phone_numbers_home': '555-1234',
    ':v_customer_phone_numbers_work': '555-5678',
    ':v_customer_addresses_billing_street': '123 Main St',
    ':v_customer_addresses_billing_city': 'Anytown',
    ':v_customer_addresses_billing_state': 'CA',
    ':v_customer_addresses_billing_zip': '12345',
    ':v_customer_addresses_shipping_street': '456 Elm St',
    ':v_customer_addresses_shipping_city': 'Anycity',
    ':v_customer_addresses_shipping_state': 'CA',
    ':v_customer_addresses_shipping_zip': '67890',
    ':v_item_product_id': 'p001',
    ':v_item_product_name': 'Widget',
    ':v_item_price': 9.99,
    ':v_item_quantity': 2
  },
  UpdateExpression: 'SET #f_order_id=:v_order_id,#f_customer.#f_customer_name=:v_customer_name,#f_customer.#f_customer_email=:v_customer_email,#f_customer.#f_customer_phone_numbers.#f_customer_phone_numbers_home=:v_customer_phone_numbers_home,#f_customer.#f_customer_phone_numbers.#f_customer_phone_numbers_work=:v_customer_phone_numbers_work,#f_customer.#f_customer_addresses.#f_customer_addresses_billing.#f_customer_addresses_billing_street=:v_customer_addresses_billing_street,#f_customer.#f_customer_addresses.#f_customer_addresses_billing.#f_customer_addresses_billing_city=:v_customer_addresses_billing_city,#f_customer.#f_customer_addresses.#f_customer_addresses_billing.#f_customer_addresses_billing_state=:v_customer_addresses_billing_state,#f_customer.#f_customer_addresses.#f_customer_addresses_billing.#f_customer_addresses_billing_zip=:v_customer_addresses_billing_zip,#f_customer.#f_customer_addresses.#f_customer_addresses_shipping.#f_customer_addresses_shipping_street=:v_customer_addresses_shipping_street,#f_customer.#f_customer_addresses.#f_customer_addresses_shipping.#f_customer_addresses_shipping_city=:v_customer_addresses_shipping_city,#f_customer.#f_customer_addresses.#f_customer_addresses_shipping.#f_customer_addresses_shipping_state=:v_customer_addresses_shipping_state,#f_customer.#f_customer_addresses.#f_customer_addresses_shipping.#f_customer_addresses_shipping_zip=:v_customer_addresses_shipping_zip,#f_item.#f_item_product_id=:v_item_product_id,#f_item.#f_item_product_name=:v_item_product_name,#f_item.#f_item_price=:v_item_price,#f_item.#f_item_quantity=:v_item_quantity'
}
*/