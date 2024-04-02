# Computer Store Managing System

>### Creating a backend system to manage small computer stores. The system should allow retailers to add items to the store,update item, find specific item and delete specific item accordingly.

##
### Functionality

```bash
Retailers should be able to
The Create operation involves adding new records or items to a database.
The Read operation involves retrieving or fetching existing records or items from a database.
The Update operation involves modifying or updating existing records or items in a database. 
The Delete operation involves removing or deleting records or items from a database.
```

### Navigate to a website 
##
#### Base URL
```bash
https://computer-store-manage-system.onrender.com/
```
>NOTE: Although the site is live but due to render restrictions if there is no activity happening on site then it will go to sleep mode. So it's better to use localhost!
##

### Curl Requests
##
> Use the below curl requests directly on Postman or any other app to use its CRUD functionality
##

#### Get all or specific items from the store(optional to find with item name otherwise gives all items).
```bash
curl --location 'http://localhost:8080/api/items?itemName=laptop'
```
##

#### Add a new item in the store.
```bash
curl --location 'http://localhost:8080/api/items' \
--header 'Content-Type: application/json' \
--data '{
    "itemName": "Keyboard",
    "description": "Mechanical gaming keyboard with RGB backlighting",
    "price": 99.99,
    "quantity": 20

  }

 '
```
##

#### Update an item in the store by name or ID using query parameters.
```bash
curl --location --request PUT 'http://localhost:8080/api/updateItems?type=name&identifier=keyboard' \
--header 'Content-Type: application/json' \
--data '{
    "price": "99.99",
    "quantity": "25"
}'
```
##

#### Delete an item from the store using the item ID.
```bash
curl --location --request DELETE 'http://localhost:8080/api/deleteItems/660188563baced74a38c8d20'
```
##

>### NOTE: You can use your own port number(By Default - 8080) or use the hosted site URL directly accordingly.
##

![get](https://github.com/anmol0001/computer-store-manage-system/assets/78845555/47291418-8586-4e2f-a091-dc33342fd3df)
##

![deletes](https://github.com/anmol0001/computer-store-manage-system/assets/78845555/4a0e75c7-0b72-4804-a909-b87fa2038952)
##
