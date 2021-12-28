
# Welcome to Borto2an Airways!

Borto2an Airways is a flight reservation website that allows you to travel the world by searching and reserving flights from different airline companies. 
All your flights are now at one place with a couple of clicks away! :smiley: 

## Motivation
This project is done in groups of 5 for the Advanced Computer Lab (ACL) 2021  at the German University in Cairo. It's the practical extension to the Software Engineering course where we were required to learn the software development lifecycle and follow the agile methodology. We tried to follow the industry best practices as much as we can to get the most out of it.

## Build Status
Borto2an Airways went through 3 sprints, each took approximately 3 weeks. Each sprint was addressing some functional and non-functional requirements. Finally, the project came to an end.
Borto2an is currently available only on local host. So, stay tuned for our launch! :smiley: 
>**Note**: 
>This project is done for educational purposes only. Please, don't use your real credit card to pay inside the website.

## Code Style
We followed the standard JavaScript coding style and naming conventions.

## Screenshots
You can find screenshots and walk-through video of our cool website [Here](https://drive.google.com/drive/folders/1NatW0ytpEeFQMouVQ-DKx2x-LKToZ1jC?usp=sharing).

## Tech Used
1. MERN Stack (MongoDB, Express JS, React JS and Node JS) for development. 
2. Git for version control and GitHub for collaboration.
3. MUI components in frontend.
4. Stripe API for payment.
5. Node Mailer for sending emails.
6. JWT for authorization.
7. Heroku for deployment (soon)

## Installation

1. Clone this repo into your computer.
2. Go to **Borto2an-** Folder.
3. Open your terminal and install backend dependencies using ```npm install ```.
4. Go to **client** Folder ```cd /client```.
5. Install frontend dependencies using ```npm install ```.
6. Create **.env** file in **Borto2an-** Folder where you will add sensitive keys and variables.
7. Run the project using ```npm run conc```.

> You must have [Node JS](https://nodejs.org/en/download/) installed on your machine. It also comes with NPM which we need to run the project.
#### Required Environment Variables:

Key | Usage
:------------: | :------------:
MONGODB_URI | Mongo DB URI to connect to database
ACCESS_TOKEN_SECRET | Secret key for hashing access tokens
REFRESH_TOKEN_SECRET | Secret key for hashing refresh tokens
STRIPE_PRIVATE_KEY | Stripe key of your account to accept payments
BORTO_PW | Password of Borto2an email for Node Mailer

You can request access to our environment variables [Here](https://drive.google.com/file/d/1Nr_56AMkoa1KdnkHdU9ZLcQEX7WSkwRK/view?usp=sharing)


## Features
Here are some of the features in Borto2an Airways:
- Three types of users: Admin - Guest - Registered User.
- Admin can create, search, update, and delete flights.
- Guest/Registered users can search flights by dates, departure, and destinations airports. 
- There are Economy, Business, and First class cabins available to choose from, each with different baggage and price.
- Registered user is able to select seats and pay for flights using his credit card.
- Registered user can create, update, and delete his reservations. 
- Emails are sent to users with reservation details or updates.
- Secure payment using Stripe API.
- Hashed passwords and secured endpoints using JWT.

Bonus features:

- If you forgot password, an email will be sent to you to reset it.

The functional and non-functional requirements for this project can be found [Here](https://docs.google.com/spreadsheets/d/121vfPRgcWcTwmq594tKWsS6iJbgwPBKqQXvL6zHh2SM/edit?usp=sharing).

## API Reference
The server contains several endpoints, each of them is secured and made only available for specific users. 
- For detailed API documentation, download and run the project on your local machine, and then go to ```http://localhost:8000/api-docs```

### Overview of the available routes: 
#### Flight routes ```/api/flights/```:
Endpoint| Usage
:------------: | :------------:
GET ```/``` | Search flights based on search criteria
GET ```/showAllflights``` | Get all flights 
POST ```/``` | Create a new flight
PUT ```/``` | Update an existing flight
DELETE ```/:id``` | Delete flight with given id

#### Airplane Model routes ```/api/airplaneModel/```:
Endpoint| Usage
:------------: | :------------:
GET ```/``` | Get airplane models based on search criteria
GET ```/:id``` | Get airplane model with given id
GET ```/showAllModels``` | Get all airplane models 
POST ```/``` | Create a new airplane model
PUT ```/``` | Update an existing airplane model
DELETE ```/:id``` | Delete airplane model with given id

#### Reservation routes ```/api/reservations/```:

Endpoint| Usage
:------------: | :------------:
GET ```/``` | Get all reservations of a user
GET ```/sendItinerary/:id``` | Send details of the reservation with given id to the user's email
POST ```/``` | Create a new Reservation 
PUT ```/``` | Update an existing Reservation
DELETE ```/:id``` | Delete Reservation with given id

#### User routes ```/api/user/```:
Endpoint| Usage
:------------: | :------------:
GET ```/``` | Get all users
GET ```/:id``` | Get user with given id
POST ```/register``` | Create a new user
PUT ```/``` | Update an existing user's info
PUT ```/password``` | Update an existing user's password
DELETE ```/:id``` | Delete user with given id

#### Authentication routes ```/api/user/auth```:
Endpoint| Usage
:------------: | :------------:
POST ```/login``` | login user and return his access token
POST ```/reset``` | reset password of a given user
POST ```/refreshToken``` | Refresh the expired access token of a user
DELETE ```/logout``` | logout user with given access token

#### Payment routes ```/api/payment/```:
Endpoint| Usage
:------------: | :------------:
POST ```/create-session``` | create a new Stripe payment session for a given reservation
	
## How to Use?
A typical user journey on Borto2an Airways is as follows:
1. Create or sign in into your account.
2. Search for flights in the home page and specify your start and destination.
3. Choose the most suitable departure and return flights, along with the preferred cabin.
4. Select the seats from the list of available seats.
5. See a summary of your reservation, in addition to the price to be paid.
6. Pay for your reservation using credit card. You have successfully reserved your flight.
7. Go to your profile and see all your reservations.
8. Edit or delete your reservations as you wish.

If you are still confused on how to use our website, please refer to our demonstration [video](https://drive.google.com/drive/folders/1NatW0ytpEeFQMouVQ-DKx2x-LKToZ1jC?usp=sharing).
## Contribute
If you want to contribute to this project, email me at omarkhair66@gmail.com. 
You are welcome to contribute at any time, and your effort is highly appreciated. 	

## Credits
Borto2an is up and running thanks to the effort of these people.
	
* [Peter Fahmi](https://github.com/PeterFahmi)
* [Youssef Amin](https://github.com/youssef204)
* [Mohamed Eshiba](https://github.com/mohamedeshiba)
* [Hesham Moneer](https://github.com/HeshamMoneer)
 * [Omar Khair](https://github.com/omarkhair)

