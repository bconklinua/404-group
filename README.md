# True Friends
A social media application where users can follow each other, make friends, look at each other's posts and interact in a friendly, connected way! 
This application has been fully deployed to Heroku, and details on how navigate it can be found below.


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

### API Documentation 
- Documentation on our APIs can be found [here](https://true-friends-404.herokuapp.com/swagger/)
- Feel free to try our any of our endpoints at https://true-friends-404.herokuapp.com/[endpoint_path]

## Registering an Account 
New accounts can be made on our [registration page](https://true-friends-404.herokuapp.com/register) where a user will enter the following:
- **email** : This will be used for logging into our website- 
- **username**: This will be used as your "display name". You can look up users by their username, and it will be attached to their posts and posts by them that are shared.
- **password**: This is completely private, and will be used for logging into your account.|

## Logging Into an Account 
You can access your account through our [Login](https://true-friends-404.herokuapp.com/login) page by entering the email and password that you registered with! 
