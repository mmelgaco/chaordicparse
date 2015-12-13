# chaordicparse

Chaordic parse challenge

A sample application written using Node.js to chaordic parse challenge

Main parts
-------------------
## A shell script do generate the input log on servers ( scripts/gerador.sh )
Edit it and change the LOOP_COUNT variable to the amount of lines you want

* Usage:
sh chaordicparse/scripts/gerador.sh > entrada.log

## A Node.js script to parse the log on the servers and send it to the main server

* Usage:
nodejs chaordicparse/scripts/parselog.js ~/entrada.log

## A Node.js express app to receive the data from the servers, sort lines by date and write it to the userid files

* Usage:

Run npm install / bower install to download the deps. ( * already done on server 1 )

`grunt serve` to run the server

Main code
-------------------
The main code to process the data, sort lines and write to files is located on:
server/api/data/data.controller.js


## Prerequisites

* Node.js - Download and Install [Node.js](https://nodejs.org)

## Testing

Running `grunt test` will run the client and server unit tests with karma and mocha.

Use `grunt test:server` to only run server tests.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)