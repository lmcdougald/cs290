Database created using the following:
	docker run --name hw6_sql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=asdf1234 -e MYSQL_DATABASE cs290 -d mysql

After configuring this database, I ran the following: 
	docker build -t hw6_app .
	docker run --name hw6_container -p 2880:2880 hw6_app 172.17.0.1 root asdf1234 cs290

Alternatively, just run:
	node main.js localhost root asdf1234 cs290

In both cases, the last 4 arguments are:
	Hostname/IP Address of the MySQL Server
	Username of the MySQL user
	Password of the MySQL user
	Database to be used

Inspect the database using PHPMyAdmin:
	docker run --name hw6_viewer -p 3000:80 -e PMA_ARBITRARY=1 phpmyadmin

Note for docker ports: the first number is the number exposed on the system, the second number is the internal port being exposed. Please only change the first number, changing the second number will not work nor help. 