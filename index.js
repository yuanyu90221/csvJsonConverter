'use strict'
let fs = require('fs');
let path = require('path');
// let Converter = require('csvtojson');
// let newConverter = new Converter({});
// let csvfile = "截至1060331之生產中工廠清冊.csv";
let outputFileName = "tw_factory_dense.json";
let firebase = require('firebase');
let jsonfile = require('jsonfile');
firebase.initializeApp({
    apiKey: "AIzaSyB0-seHrVe153wFhS-EIUbJQCHLBmuzO0s",
    authDomain: "webfirebasedb.firebaseapp.com",
    databaseURL: "https://webfirebasedb.firebaseio.com",
    storageBucket: "webfirebasedb.appspot.com",
    messagingSenderId: "1073692172194"
});
// fs.createReadStream(path.join("./input",csvfile)).pipe(newConverter);

// newConverter.on("end_parsed", function(jsonArray){
//     jsonArray.forEach(function(element) {
//         console.log(element["統一編號"]);
//         let uid = element["統一編號"];
//         console.dir(element);
//         firebase.database().ref(`/factory/${uid}`).set(element).then((re)=>{
//             console.log(`${uid} is finished`);
//         });
//     });
//     fs.writeFile(path.join("./result",outputFileName),JSON.stringify(jsonArray),'utf8');
//     console.log('csv to JSON done !!');
// });
//  firebase.database().ref("/factory").remove();
const matchKey = "工廠名稱";
const uidKey = "統一編號";

const baseArr=jsonfile.readFileSync(path.join('./result',outputFileName));
const refArr = jsonfile.readFileSync(path.join('./result','factory_trim.json'));
baseArr.forEach((data)=>{
    let search = data[matchKey];
    let uid = data[uidKey];
    let searchResult = refArr.find((item)=>{
        return item[matchKey]==search;
    });
    if(searchResult){
        firebase.database().ref(`/factory/${uid}`).update({lat:searchResult.lat,lon:searchResult.lon}).then((re)=>{
            console.log(`${uid} is finished`);
            console.log(data[uidKey],searchResult.lat, searchResult.lon);
        });
    }
    
});
