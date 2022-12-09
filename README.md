# True Friends
![Screenshot](https://i.ibb.co/pX7XVKB/True-Friends.png)

![GitHub contributors](https://img.shields.io/github/contributors/bconklinua/404-group)
![Lines of code](https://img.shields.io/tokei/lines/github/bconklinua/404-group?style=plastic)
![swagger](https://img.shields.io/swagger/valid/3.0?specUrl=https%3A%2F%2Fraw.githubusercontent.com%2Fbconklinua%2F404-group%2Fstaging%2Fbackend%2Fopenapi-schema.yml)




A social media application where users can follow each other, make friends, look at each other's posts and interact in a friendly, connected way! 
This application has been fully deployed to a Heroku instance, and details on how to navigate it can be found below.

A video demonstration of the functionalities of this web app can be shown [here](https://www.youtube.com/watch?v=N4jzfrdzKk0)


## Developer Instructions

### Mac/Linux
```
virtualenv venv --python=python3
source venv/bin/activate
pip install -r requirements.txt
```
### Windows
```
virtualenv venv --python=python3
venv\Scripts\activate
pip install -r requirements.txt
```

### Windows Issues
```
Set-ExecutionPolicy Unrestricted -Scope Process
```
### Deployment
The React and Django app is run together on a Heroku basic dyno attached with a mini postgres database
### API Documentation 
- Documentation on our APIs can be found [here](https://true-friends-404.herokuapp.com/swagger/). Ensure you are logged in to view.
- Feel free to try our any of our endpoints at https://true-friends-404.herokuapp.com/[endpoint_path]

## Registering an Account 
New accounts can be made on our [registration page](https://true-friends-404.herokuapp.com/register) where a user will enter the following:
- **email** : This will be used for logging into our website- 
- **username**: This will be used as your "display name". You can look up users by their username, and it will be attached to their posts and posts by them that are shared.
- **password**: This is completely private, and will be used for logging into your account.|

## Logging Into an Account 
You can access your account through our [Login](https://true-friends-404.herokuapp.com/login) page by entering the email and password that you registered with!

## Changes Made Since Presentation

* Updated tests to be compatible with usage of UUIDs instead of numberical IDs

## True-Friends Features Run-Through

* Ability to send and receive friend requests
* Post images, markdown, and text based posts. Image posts can be made by using an uploaded image, or pasting in the url to an existing image.
* Live updating search of other users on the app
* Ability to like and comment on posts
* Ability to like comments. 
* Ability to share posts.
* Privacy features for posts to set as public, friends only, and unlisted
* Edit own posts after posting
* Connect nd display your Github activity on your profile
* Explore other users on the app
* Logout of your account and login to another account

## Connection with Other Teams

Our social media app was able to successfully connect with the following two applications: 

1. [Team 13](https://cmput404-team13.herokuapp.com)
2. [Team 19](https://social-distribution-404.herokuapp.com)

This connection means that we can search for, follow, and interact with users on the above applications. In our inbox, we can receive their friends-only posts if we are friends with them, and their public posts if we follow them. We can also like and comment on each other's posts, like comments on each other's posts, and share remote posts.

We also almost fully connected with [Team 10](https://socioecon.herokuapp.com)'s application. 

For the Team 10 connection, we were able to send and accept friend requests, view their profiles and public posts, and send posts to each other's inboxes with the correct visibility. Our application also includes code for liking their posts and comments, but we were unable to test this fully due to those functionalities not being completed fully on their application at the time of the connection. 

### Video Demonstration
[![CMPUT 404 Video Team 12 2022](https://img.youtube.com/vi/N4jzfrdzKk0/0.jpg)](https://www.youtube.com/watch?v=N4jzfrdzKk0 "CMPUT 404 Video Team 12 2022")
