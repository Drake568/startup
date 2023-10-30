# startup

[Notes Link](Notes/notes.md)

# FaithPlates

## Description deliverable

### Elevator pitch

Do you want a good place to store your gospel study notes? Would you like a platform where you can create, see, and share your notes with friends and family? FaithPlates makes that possible. Your notes are stored in the cloud for easy access from any device. You can share your notes with friends and family. You can even see their notes and learn from them.

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
