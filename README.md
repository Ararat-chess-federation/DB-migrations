# DB migration

DB migration from Ararat Region Chess Federation [old website](http://old.ararat.chessnews.am/) to [new website](http://ararat.chessnews.am/)

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

Next, type the command `npm start`, the program will migrate all data to the new site and delete unnecessary files from this application.

## IMPORTANT

This application is structured for the site [http://ararat.chessnews.am](http://ararat.chessnews.am/). Without editing it will not work for your site.

To customize it for your site, you need to edit the `getTransformedData` function in the `src/helpers/transformData.js` file, writing the fields you need.