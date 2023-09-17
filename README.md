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
- **WebSocket** - When a user posts their study they will be accessible to other users
- **React** - Application ported to use the React web framework.
