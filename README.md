# FlyMe — Flight Booking Management System

**Course:** IMS566 — Advanced Web Design Development and Content Management  
**Project:** Individual Assignment (20%)  
**Project type:** Responsive front-end web application prototype

## 1. Project overview

FlyMe is a browser-based flight booking management system prototype. It provides a simple workspace for managing flight reservations and viewing passenger information and departure schedules. The application includes account registration and sign-in, a dashboard, flight booking management, a passenger directory and a booking calendar.

FlyMe is an academic front-end prototype. It is not connected to a real airline reservation system, live flight inventory, a payment gateway or a ticketing service.

## 2. Main features

### Account registration and sign-in
- Users can create an account by entering their full name, username, email address and password.
- Registration checks that the username and email address have not already been registered.
- The password and confirmation fields must match, and the password must contain at least six characters.
- Users sign in with their registered username and password.
- The application displays an error message when the login details are incorrect.
- The signed-in username is displayed in the application header and dashboard greeting. The avatar uses the first letter of the username.
- Users can sign out and return to the login page.

### Dashboard
- Displays the total number of bookings, confirmed bookings, pending bookings and unique passengers.
- Shows a monthly booking activity chart.
- Summarises bookings by status: Confirmed, Pending and Cancelled.
- Displays recent booking records and provides a link to the full bookings page.
- Provides a shortcut to add a new booking.

### Flight bookings
- Displays booking ID, passenger name, email address, flight number, route, departure date, travel class, amount and booking status.
- Allows users to search booking records and filter them by status.
- Allows users to add, edit and delete booking records.
- Supports the Confirmed, Pending and Cancelled booking statuses.
- Displays the booking amount in MYR.

### Passengers
- Builds the passenger directory from the passenger details saved in flight booking records.
- Displays each passenger's name, email address, total bookings, confirmed bookings and latest departure date.
- Provides a search field for passenger names and email addresses.
- Passenger details are updated by editing the relevant booking record.

### Booking calendar
- Displays a monthly calendar with departure dates from the saved booking records.
- Allows users to move to the previous or next month.
- Selecting a date displays the associated departure and reservation details.
- Uses calendar indicators to distinguish dates with departures and pending bookings.

## 3. Sample booking records

The project includes six sample passenger records for demonstration:

- Safia Amalin
- Izwan Hakimi
- Faiz Iskandar
- Amer Faiz
- Rifa Basheerah
- Nuriyah Aziz

The sample records also contain fictional booking IDs, flight numbers, routes, departure dates, travel classes, amounts and booking statuses. These records are demonstration data and do not represent actual airline reservations.

## 4. How to run the project

1. Download and extract the project ZIP file.
2. Open the extracted `FlyMe_IMS566_Project` folder.
3. Open `index.html` in a web browser. It automatically redirects to `login.html`. You can also open `login.html` directly.
4. Select **Create an account** to register a new account.
5. Complete the registration form. Use a unique username and email address, and enter a password with at least six characters.
6. Return to the sign-in page and log in using the username and password you registered.
7. After signing in, use the sidebar to access Dashboard, Flight bookings, Passengers and Booking calendar.

Internet access is required to load the Bootstrap, Chart.js and Google Fonts resources from their CDNs.

## 5. Data storage and technical limitations

- Account records are stored in the browser's `localStorage` using the `flyMeAccounts` key.
- Booking records are stored in the browser's `localStorage` using the `flyMeBookings` key.
- The signed-in session and current username are stored in `sessionStorage`.
- Data is stored locally in the browser and is not synchronised between devices or different browsers.
- Clearing the browser's site data may remove the saved accounts and bookings.
- Authentication is implemented on the front end for demonstration purposes. It is not secure production authentication, and passwords are not protected by a server-side authentication system.
- The application does not provide live flight availability, seat selection, real payment processing, email notifications or ticket issuance.
- All sample passenger and booking information is fictional.

**Security note:** Do not use a real password or a password that you use for another account when testing this prototype.

## 6. Technologies and libraries

- **HTML5** — page structure and forms.
- **CSS3** — layout, responsive styling and visual theme.
- **JavaScript** — registration, sign-in, booking operations, search, filtering, dashboard calculations and calendar interactions.
- **Bootstrap 5.3.3** — responsive layout, form styling, modal and toast components.
- **Chart.js 4.4.3** — monthly booking activity chart.
- **Google Fonts** — DM Sans and Playfair Display typography.
- **Web Storage API** — `localStorage` and `sessionStorage` for browser-based data and session storage.

## 7. Project structure

```text
FlyMe_IMS566_Project/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── bookings.html
├── customers.html
├── calendar.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

## 8. Main files and editing guide

- `index.html` — redirects visitors to the login page.
- `login.html` — contains the sign-in form.
- `register.html` — contains the account registration form.
- `dashboard.html` — displays booking statistics, status summary, monthly chart and recent bookings.
- `bookings.html` — contains the booking table and add/edit booking form.
- `customers.html` — displays the passenger directory generated from booking records.
- `calendar.html` — displays the monthly booking calendar and selected-date departures.
- `assets/css/style.css` — controls the application's layout, responsive styles, typography and sage-green/nude colour palette. The main colour variables are defined in `:root`.
- `assets/js/app.js` — contains sample booking data, browser storage helpers, authentication, registration, dashboard rendering, booking management, passenger listing and calendar functionality.

The JavaScript file is organised with section comments to make the main functions easier to locate and edit.

## 9. GitHub Pages deployment (optional)

1. Create a repository on GitHub.
2. Upload the contents of the `FlyMe_IMS566_Project` folder while preserving the folder structure.
3. Open the repository's **Settings → Pages** section.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Once deployment is complete, open the published GitHub Pages URL. The `index.html` page will redirect to the login page.

For submission, provide the published website URL and the GitHub repository URL if required by the lecturer.

## 10. Future improvements

For use beyond an academic demonstration, the prototype would need a secure back-end application, a database, server-side password hashing and authentication, role-based access control, integration with a genuine flight data or airline reservation service, and a secure payment provider.
