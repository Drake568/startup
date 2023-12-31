# startup

[Notes Link](Notes/notes.md)

# SmallPlates

## Description deliverable

### Elevator pitch

Do you want a good place to store your gospel study notes? Would you like a platform where you can create, see, and share your notes with friends and family? SmallPlates makes that possible. Your notes are stored in the cloud for easy access from any device. You can share your notes with friends and family. You can even see their notes and learn from them.

### Design

![Login Page](designPhotos/loginPage.jpg)
![Create Study Page](designPhotos/createStudy.jpg)
![View pages](designPhotos/viewStudies.jpg)

### Key features

- Secure login over HTTPS
- Create, edit, and delete studies
- View studies from other users
- Share studies with other users

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Four HTML pages: Login page, create study page, Personal Study page, Friend's study page. Links to pages in header. Iframes for displaying study links.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, choice display, applying votes, display other users votes, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving studies
  - posting studies
- **DB** - Store users and studies.
- **Login** - Register and login users. Credentials securely stored in database.
- **WebSocket** - There will be a notification system for friend requests and study shares.
- **React** - Application ported to use the React web framework.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Four HTML pages. The login page, home page, friend studies page, and compose page.
- **Links** - The login page automatically links to the home page. The rest of the pages have links to the others and a logout page to return to the login page.
- **Text** - Most of the text shown will be the content from the database but there are titles for all the sections.
- **Images** - I inserted an icon on every page.
- **Login** - Input box for username and password with a submit button for login.
- **Database** - The studies and users will be stored in a database. I put mocked data on the html pages.
- **WebSocket** - There is a notification section on the home page that will notify the user of friend requests and study shares in real time.
- **3rd Party services** - The users can provide links to websites containing their study material. These will be pulled up in iframes.

## CSS deliverable

For this deliverable I styled the application using CSS. I plan to update the styling as I go but this has it looking mostly how I want the final product to look.

- **Header, footer, and main content body** - I added css files for each page. There is a main css file that is shared including the navbar/header and footer styling. It also includes any shared main content styling. I made separate css files for styling that is unique to each page.
- **Navigation elements** - I made the nav bar look nice and have links to the other pages. The nav links look like buttons. I dropped the underline on the nav links
- **Responsive to window resizing** - My app looks great on all window sizes and devices
- **Application elements** - Used good contrast and whitespace
- **Application text content** - I used CSS to fill in the text content for the application. These are still mostly placeholders. The item containers will be update when I get real data from the database. This includes the Notifications and studies.
- **Application images** - There is an updated icon on the nav bar. I changed the styling to make it look better.

## JS deliverable

For this deliverable I added JavaScript to the application. I added the following features.

- **JavaScript support for future login** - Added login function. Adds data to local storage with placeholder for database validation.
- **JavaScript support for future database data** - Built out logic for getting and posting data to local storage. Will simply replace with the database later.
- **JavaScript support for future WebSocket** - Added placeholder logic for friend requests.
- **JavaScript support for your application's interaction logic** - Added JavaScript to handle all functions of the application.

## Service deliverable

For this deliverable I added backend endpoints for everything that will use the database as well as a third party endpoint.

- **Node.js/Express HTTP service** - done
- **Static middleware for frontend** - done. I used the express.static to serve the frontend files, the express.json to parse the request body, and jwt to create and verify an authtoken.
- **Calls to third party endpoints** - done. I used a bible api to get a verse of the day shown in the footer.
- **Backend service endpoints** - done. Added a ton of endpoints for all the different functions of the application. For now all application data is stored in the server memory. I will replace this with a database later.
- **Frontend calls service endpoints** - I did this using the fetch function.

## DB deliverable

For this deliverable I hooked up a mongo database to my application.

- **MongoDB Atlas database created** - done!
- **Endpoints for data** - The services my endpoints hit now store the data in the database rather than locally on the server.
- **Stores data in MongoDB** - done!

## Login deliverable

I already had implemented a registration and authentication system for my application. I simply edited it for this deliverable.

- **User registration** - Changed my current registration system to hash the password and store it in the database.
- **existing user** - The hashed password is compared to the one in the database to authenticate the user.
- **Use MongoDB to store credentials** - Done.
- **Restricts functionality** - The only endpoints that are not protected by authentication are the login and register endpoints. I also changed my authentication to use a cookie rather than a header.

## WebSocket deliverable

For this deliverable I used webSocket to notify users of friend requests in real time. I plan to add a bit more later but this is a good start.

- **Backend listens for WebSocket connection** - done!
- **Frontend makes WebSocket connection** - done!
- **Data sent over WebSocket connection** - done!
- **WebSocket data displayed** - Friend requests are displayed in the notifications section of the home page. They pop up without the user having to refresh the page.

## React deliverable

For this deliverable I converted the application over to use React. I completely redid the UI.

- **Bundled and transpiled** - done!
- **Components** - Made several components such as the StudiesGrid and Navbar for better code reuse.
- **Router** - I used a router to change pages.
- **Hooks** - I used useEffect, useState, and useContext hooks as needed.
