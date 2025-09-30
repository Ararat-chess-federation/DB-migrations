# DB migration

DB migration from Ararat Region Chess Federation old website to [new website](https://ararat.chessnews.am/)

## Stack
- NodeJS

## How to setup
- git clone https://github.com/Ararat-chess-federation/DB-migrations.git
- cd DB-migrations
- setup **.env** file (see **.env.example**)
- npm i
- npm start

## How it works
You need to download data from the old Wordpress website in .xml format and paste the file into the /assets folder.

The file name must match the value of the `WP_XML_FILE` variable in **.env**.

## IMPORTANT

This application is structured for the site [https://ararat.chessnews.am](http://ararat.chessnews.am/). Without editing it will not work for your site.
