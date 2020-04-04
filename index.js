//NPM packages first || parent_imports
// DOTENV FIRST FOR NO EVNIRONEMT_OVERLAPPING WITH OTHER PACKAGE IMPORTS
require("dotenv").config();
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
// child_imports || HELPERS

// CLI-ARGS
const argOne = process.argv[2];
const argTwo = process.argv[3];

//API DOCS: " Your api key will be visable in the network traffic, ths sould not be used for public projects "
const alpha = require("alphavantage")({
  key: process.env.ALPHAVANTAGE_API_KEY
});


/**
 * GIVENS:
 * - arg-one
 * - arg-two:: can be multi-word IFF encap'd >> ""
 * -----------------------------------------------
 * TODOS:
 * * IFF you want to rebuild version1(LIRI) && just clean it up *
 * * ELSE do different outcomes for cli args *
 * * :|:?WHAT_THO?:|:(K.I.S.S)=> 3 actions    *
 * ==========================================
 * CHECKLIST:
 * <get-stock-data> :: works ****** go back to make the displayed output look more pristine
 * <hash-this-string>:: IN_PROGRESS << " so far I have the string query pushed into an empty array; then have split the querySTR into individual indexes "
 * <ef-es>:: NOT_STARTED:: << deciding the best optimal approach to write/read/append-File method.....BECAUSE INQUIRER WILL HELP ME WITH MAKING THAT LOOK AMAING!
 * ==========================================
 * @-the MAIN:<:< function (action, query){
 * SWITCH<~>action
 *      1~>>> look up stock data << "get-stock-data"
 *  > GOT API KEY < *check/|
 *  > now place method inside of its case and attach the query to the cb('VALUE')
 * >>WORKS>>> 4|4/2/2020|18:06|>>>>>>>>|||||||||
 * ===================================================~~~~~~~~~~~~~~~
 *      2~>>> password-hasher-generator << "hash-this-string"
 * // take input string,
 * generate input (n)
 * => return (n*phi) * (random number picked from range 0 to 1618)^e(Pi)
 * ....then cos(result) then cot(cos_res)
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *      3~>>> fs-module-method to create/read/delete file << "ef-es"
 * // write-new-text << "users message string concatenated into a new file" && allow overrite if wanted
 * // read-file
 * // append-file << add to present file >> 'list' || data
 * ========================================================
 * ELSE => just add the node spotify api too to whatever else i get to work as an EXTRA cherry on top...OMDB too while im at it.
 * }
 */


// MAIN
// I::>
// define method
const runApp = function(action, query) {
  switch (action) {
    case "get-stock-data":
      console.log("STOCK_METHOD\n" + query);
      alpha.data.intraday(query).then(stockData => {
        console.log(stockData);
      });
      break;

    case "hash-this-string":
      console.log("PASSWORD_GENERATOR_METHOD\n\n----OLD_PASSWORD----\n" + query);
        var a = query.split(""),
        n = a.length;
        for (var i = n - 3; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1 * 1.618 -2/3 *5));
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
          var list = a.join("")
          // console.log(list);
        // @ this point it prints out a different shuffle per iteration.....
        // I think this is even better of an outcome than i expected!
        let holder = [];
        holder.push(list)

        console.log(`====================\n----NEW_PASSWORD----\n${holder}`);
        return holder
        }
      break;

    case "ef-es":
      console.log("CRUD_FILE-SYSTEM_METHOD");
      // writeFile
      fs.writeFile("writeFileMethod_txtOUTPUT.txt", query, (k) => {
        if (k) {
          console.log({
            YOU: "yes you.",
            ERROR: true,
            ERROR_MESSAGE:"Either you forgot to wrap your message with \"quotation marks\"\nOr I messed up somehwere..."
          });
          return k
        }
        // console.log({
        //   INPUTdata: query
        // })
      })
      // readFile
      fs.readFile("writeFileMethod_txtOUTPUT.txt", 'utf-8', (k,d) => {
        if (k) throw k;
        // console.log({
        //   msgINfile: d
        // });
      })
      // appendFile
      const fourApnd = query+"\n";
      fs.appendFile("theList.txt", fourApnd, (k) => {
        if (k) console.log(k);
        console.log("....\ngo take a look over there!")
      })
      break;
  }
};

// O::>
// callback the main ~|.\./.|~
runApp(argOne, argTwo);

/**
 *
 * WHEN THIS ALL RUNS PERFECTLY THEN TRANSFORM THIS USING THE INQUIRER PACKAGE
 * >>EXACTLY HOW I WISHED I HAD IT WORKING BACK WHEN IN RCB...IM GOING TO MAKE IT WORK NOW
 * >>MORE CONFIDENCE IN MYSELF NOW THAN EVER BEFORE TO BE ABLE TO PULL THIS OFF!
 *
 */
