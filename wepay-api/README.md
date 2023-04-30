# Wepay

WePay is a versatile payment system API that enables users to easily deposit, transfer, and withdraw money. Along with these core functions, the API also includes a powerful budget system, an activity log, and a payment option for sellers in real-world markets. With WePay, users can enjoy a streamlined and hassle-free experience when it comes to managing their finances and payments.

## Installation

To run this API locally, you'll need Node.js and MongoDB installed on your system. Clone this repository, then install the required dependencies by running:

```bash
npm install

```
You can start the server by running:
```bash
npm start

```
The API will be available at [Local host](https://localhost:3000).

## Authentication
To access protected routes, you'll need to include an Authorization header with a valid JWT token. 
To obtain a token , first you need to have an account registered , send a POST request to `/api/v1.0/auth/signup` with a JSON payload containing your first Name , last Name , middle Name , email, user Name, phone Number, password, pin:
```json
{
    "firstName": "jhon",
    "lastName": "doe",
    "middleName": "jane",
    "email": "jhon@example.com",
    "userName": "example",
    "phoneNumber": "0996513429",
    "password": "password123",
    "pin":"1234"
}
```
The response will include an access token , user information , message:
```json
{
    "message": "User created. Check your email for activation code.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ1NTc1NTNlMDkxZTY3ODY0NTk2MjkiLCJpYXQiOjE2ODIyNjU5NDJ9.tbisqnaEfVRf3jxfcm_DASannbhiyCPkxKsYSIxQHTs",
    "user": {
        "firstName": "johan",
        "lastName": "doe",
        "middleName": "jone",
        "email": "johan.doe@gmail.com",
        "userName": "johan doe",
        "phoneNumber": "0996513429",
        "password": "$2a$10$.pfEPLKECGdds5oq6FYrB.e2mBOfKISrxkPBP7nTh8BNr5gQu.TRS",
        "pin": "$2a$10$7WExmUX0VZziFoVGkuspWOrVdK3Fs7/DT2VRaCRWknzbuWRnNnGKC",
        "role": 0,
        "Balance": 0,
        "totalIncome": 0,
        "totalPayment": 0,
        "_id": "644557553e091e6786459629",
        "createdAt": "2023-04-23T16:05:41.829Z",
        "updatedAt": "2023-04-23T16:05:41.829Z",
        "qrcode": "841601",
        "__v": 0
    }
}
```
if you need to login again 
send a POST request to `/api/v1.0/auth/login` with a JSON payload containing your email and password and pin:
```json
{
    "email": "johan.doe@gmail.com",
    "password": "password1234",
    "pin":"1234"
}
```
The response will include an access token:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ1NTc1NTNlMDkxZTY3ODY0NTk2MjkiLCJpYXQiOjE2ODIyNjYyMzl9.fYJWJnFLQ6hWj53oPuIQc4mE1UXLgzMfExrrsApHsDI"
}
```
Include this token in the Authorization header of subsequent requests:

``Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ1NTc1NTNlMDkxZTY3ODY0NTk2MjkiLCJpYXQiOjE2ODIyNjYyMzl9.fYJWJnFLQ6hWj53oPuIQc4mE1UXLgzMfExrrsApHsDI
``

# Endpoints

The following endpoints are available:

#### endpoint for updating Basic information to your account :

`PUT /api/v1.0/auth/updateBasic`

where you can upload an image for your account and update your name or phone number
should send it in form-data 
### Request Body

#### Form Data

| Name         | Type        | Description                      |
| ------------ | ----------- | -------------------------------- |
| imgURL         | file        | Optional. The file to be uploaded |
| firstName        | string      | Optional. Title for the file      |
| lastName  | string      | Optional. Description of the file |
| middleName  | string      | Optional. Description of the file |
| phoneNumber  | string      | Optional. Description of the file |

### Response
the response will have 

