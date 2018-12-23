# BManager
Web application for management and monitoring of orders production process and supply.

# Description
The project is a complete web application that was tested on Chrome (IE have number of known issues).
The application developed with a simple UI that have built-in support for multiple languages, currently Hebrew & English.
The main idea is to manage orders & production in an effective way.
The application makes life easier with the 'Monitoring' feature, you can configure the monitoing interval that is an hours value.
According to the configuration orders will be pulled into the monitoring view, from that view the employee will have the ability to change
order status. Time is always tacked and colors will supply indication for the order status (In-Progress, Delay etc.)
Please view the 'Screen Shots' folder.

# Technical info:
The backend developed in php (web services + business logic) and MySql DB.
The frontend developed in Angular.JS using Typescript with lazy loading module (System.js).  

# Configure work environment:
To start running the project you will need to set-up an Apache Web Server, PHP Server and MySql Database.
For quick start XAMPP is recommended -> https://www.apachefriends.org/index.html
The next step will be to import the DB initial scheme, you can find the last version under the 'Database' folder.
Finally, copy the build into the Apache root web folder, you can use the 'build.bat' script to build the project.

Please let me know if you have any questions...
