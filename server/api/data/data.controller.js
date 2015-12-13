'use strict';

var _  = require('lodash');
var fs = require('fs');
var moment = require('moment');

// Get list of datas
exports.index = function(req, res) {
  res.json([]);
};

var dataToWrite = {};
var dataFlusing = {};

// Receive data
exports.post = function(req, res) {
    //console.log('body: %j', req.body);
    console.log('body length: %j', _.keys(req.body).length);
    _.forEach(req.body, function(value, key){
        if(!dataToWrite[key]){
            dataToWrite[key] = value;
        }else{
            dataToWrite[key] = _(dataToWrite[key]).concat(value).value();
        }
    });
    console.log('dataToWrite length: %j', _.keys(dataToWrite).length);
    res.json({});
};

setInterval(function(){
    console.log('10 secs - sorting and flushing data to disk !!!!!!!!!!!!!!!!');
    dataFlusing = _.assign({}, dataToWrite);
    dataToWrite = {};
    _.forEach(dataFlusing, function(value, key){
        //console.log('value to sort: %j', value);
        console.log(new Date()+' - sorting uid '+key+' with length '+value.length);
        value = _.sortBy(value, function(n){
            var dateTime = n.data.substring(n.data.indexOf('[')+1, n.data.indexOf(']'));
            return moment(dateTime, "DD/MM/YYYY HH:mm:ss");//13/12/2015 10:45:08
        });
        console.log(new Date()+' - sorted uid '+key+' with length '+value.length);
        writeUID(key, value);
    });
},10000);

function writeUID(key, value){

    var dataString = transformJsonToData(value);
    //console.log('writeUID data: %j', dataString);
    console.log(new Date()+' - writing file for uid '+key+' with length '+dataString.length);
    fs.appendFile('saida/' + key, dataString, function (err) {
        if (err) return console.log(err);
        console.log(new Date()+' - saida/'+key+' was written successfully! ');
    });

}

function transformJsonToData(json){
    var result = '';
    _.each(json, function(line) {
        result += line.data;
        result += '\n';
    });
    return result;
}