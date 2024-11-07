# Spotify Backend

A Node.js backend project for Spotify authentication and integration. This project allows you to authenticate users using Spotify’s API and retrieve an authorization token to interact with Spotify services.

## Features

- Authentication with Spotify using OAuth 2.0 authorization code flow.
- Retrieval of the Spotify access token from Spotify's API to interact with their Web API.
- Custom routes for managing authentication and handling API requests.
- Core and header management for better code organization.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/devwithmehar/spotify-backed.git
    cd spotify-backed
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:
    - `SPOTIFY_CLIENT_ID`
    - `SPOTIFY_CLIENT_SECRET`
    - `SPOTIFY_REDIRECT_URI`

    You can get these values from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).

4. Run the application:

    ```bash
    npm start
    ```

5. Access the app at `http://localhost:3000`.

## Authentication Flow

The authentication process uses the authorization code flow, which is a standard OAuth 2.0 flow:

1. The user is redirected to Spotify's login page to grant permission for accessing their account.
2. Upon successful authorization, Spotify redirects the user back to the provided `redirect_uri` with an authorization code.
3. The authorization code is sent to the `login.js` route, which exchanges it for an access token by making a POST request to:

    ```bash
    POST https://accounts.spotify.com/api/token
    ```

    The required parameters for this request are:
    - `grant_type: 'authorization_code'`
    - `code: <authorization_code>`
    - `redirect_uri: <redirect_uri>`

4. The access token returned in the response can now be used to interact with Spotify's Web API.

## Routes

- `POST /login`: Handles the Spotify authentication and retrieves the access token.
- `GET /profile`: Fetches the user's Spotify profile details (example route to utilize the token).

## References

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [OAuth 2.0 Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/)

## Contributing

Feel free to open issues or submit pull requests. Please make sure to follow the contribution guidelines for any enhancements or bug fixes.

## FrontEnd Application 

The Frontend for this application is available in a separate repository:



[![GitHub](https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/devwithmehar/music-app-frontend) 

You can follow the instructions in the backend repository to set it up and run it.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
