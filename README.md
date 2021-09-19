# Blogs


**Node.js Backend challenge**

The task is created to Trufla and it was backend API for a simple blog system consisting of Articles, Authors, and Comments.


**github Repo Content**

1- Main branch consist of Backend folder, Frontend folder, Database folder which contain Sequelize files and Image for database Schema or ERD Diagram and Postman file that contain tests API

2- Deployment branch consists of server and client folders and this file is prepared for deployment but the issue faced me was can't deploy
MySQL database free without credit information.


**Project Objective**

Additional to be a node.js backend challenge it take me to many useful points like convert
complex database queries to sequelize like left join, outer join.

There is one important point which is database structure build based on database schema 
documentation for future upgrades or other uses for these data so any relationships take 
consider future work to just high efficiency not just for current time work.



**Description**

1- Articles contain article model (title, body, and author ) addition to API (Create a new article, 
list all articles, Read/retrieve article by id, update or delete the article )

2- Filter or search consists of API for (search for article by title, piece of body, author Id, author name)

3- Author contain author model (name, job title) addition and Have API for creating new author, 
list all author, read/retrieve author information by id or name, and update profile )

4- User consists of API for ( create new user, check the user exists, add comments for article and thumbs up to any article)

5- The last API created was a short article based on a thumbs-up count.

6- The database and relations between tables were created based on most database documentation,
and structure was put to fit for further upgrades and use data in other functions effective ways
for example (author and article have many-to-one, users and articles many-to-many, etc...

7- uses sequelize ORM was a very good choice for me because it makes deals with errors, updates more easy, 
fast and of course more secure than using MySQL queries directly in node.js project. 




**Usage**


In order to use this App, you need terminal. You also need to download and install node.js ,npm and react. You will also need to signin to Mongodb.com. or just use mate database because i already allows access from any IP's. In addition, make sure npm install to update and add any package you will need after clone project. if you want just to see how the app works.

**Credits and Reference**

https://www.npmjs.com/package/shortid

https://dba.stackexchange.com/questions/57293/mysql-alter-table-to-automatically-put-in-a-uuid

https://www.lipsum.com/

https://sequelize.org/master/class/lib/model.js~Model.html#destroyoptions-promiseinteger

https://sequelize.org/


**Tests**

npm start


**Notes**

I hope give me feedback soon whatever good or bad because that's will help me in the future.
Thanks, advanced.

**Author Contact **


Email: yusufabdelmoniem2008@gmail.com
