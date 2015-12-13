var request 	= require('request');

console.log('reading file: '+process.argv[2]);

var rl = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
});

var data = {
};
var toSend = [];
var count = 0;

rl.on('line', function (line) {
    //console.log('Line from file:', line);
    var userid = line.substring(line.indexOf('userid=')+7);
    userid = userid.replace(/[^0-9]/gi, '');
    //console.log(userid);
    if(!data[userid]){
        data[userid] = [];
    }
    data[userid].push({
        data: line,
        userid: userid
    });
    count++;
    if(count%100==0){
        console.log('100 lines reached, sending data');
        toSend.push(data);
        data = {};
        send();
    }
});

rl.on('close', function () {
    console.log('end of file');
    if(toSend.length>0){

        send();
    }
});

function send(){
    console.log('starting to send data');
    //console.log(JSON.stringify(toSend, null, '\t'));

    var dataToSend = toSend.pop();

    var requestOptions = {
        uri: 'http://localhost:9000/api/data',
        method: 'POST',
        json: dataToSend
    };

    //console.log('starting send data:\n%j', requestOptions);
    request(requestOptions, function(err, response, body) {
        if(err) {
            console.log('error trying to send data: %j',err);
        } else {
            console.log('status code: %j', response.statusCode);
            console.log('response:\n%j', body);
            if(response.statusCode == 200) {
                console.log('data sent ok');
            } else {
                console.log(body);
                throw {
                    error: 500,
                    message: 'Wrong server response'
                };
            }
        }
    });



}