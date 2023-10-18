# Game Store

<br>



## Description

Search platform for gamers and enthusiasts find games, know more about games and save their games.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by game, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can add favorite games to my list and add notes.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorites and delete them.
- **edit profile** - As a user I want to be able to edit my profile.
- **edit games** - As an admin I want to be able to edit games info.
- **result** - As a user I want to see the list of games filter by my preferences.
- **games listing** - As a user I want to see more details of the beaches, be able to know their details.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         |                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. |                                   |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `POST`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. |  |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     |                                                                          |
| `GET`      | `/games`                     | Renders `games-list` view.                              |                                                          |
| `GET`      | `/games/details/:id`         | Renders `games-details` view for the beaches. |                                                          |
| `POST`      | `/games/details/:id`         | Sends edit games info to the server and updates the game in the DB. |                                                          |







## Models

User model

```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
}

```





Games Model

```javascript
{
  name: String,
  type: String,
  size: String,
  description: String,
  platform: Array
}
```

<br>

## API's

We're going to use google maps API and a weather API

<br>


## Packages
-Node.js
-React
-Express.Js
-Mongoose
-Axios

<br>



## Backlog






<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/k-129/game-store)

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link]()

### Contributors
Erik Knoef - [`<github-username>`](https://github.com/k-129) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/erikknoef129)

Guy Dagan - [`<github-username>`](https://github.com/Guy-Dagan) - [`<linkedin-profile-link>`]()
