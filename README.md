# habit_tracker

Simple habit tracker made using ExpressJS framework and MongoDB.
This application provides very basic functionalities like adding a habit, deleting a habit and record and update the status
of each habit for last 7 days.

# Libraries Required:
  "connect-mongo": "^3.2.0",
  "ejs": "^3.1.3",
  "express": "^4.17.1",
  "mongoose": "^5.9.18",
   This data is directly acquired from package.json.
  
# Project Structure:
  1. assets: contains all static files like css, js.<br>
  2. config: Contains configuration js for mongoose and passport<br>
  3. models: Contains db collection creation js for users and habits.<br>
  4. views: Contains all views.

# Project Setup:
 1. Download as zip and extract in your local system.
 2. Open folder in VS code.
 3. Open terminal and make the project folder as your current directory and run 'npm init'.
 4. Install all the libraries mentioned above(npm install library-name)
 5. To start the server, use command: node index.js
 6. Go to https://localhost/8000 on your browser to use the application
 7. Voila!! You have your own habit tracker.
