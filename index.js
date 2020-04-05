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
  key: process.env.ALPHAVANTAGE_API_KEY,
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
 * ===================================================~~~~~~~~~~~~~~~
 *      2~>>> password-hasher-generator << "hash-this-string"
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *      3~>>> fs-module-method to create/read/delete file << "ef-es"
 * ==================================================================
 * }
 */


inquirer.prompt({
  name:"welcome",
  type:"list",
  message:"Welcome to The Lor!\n...\nWHAT COULD I DO FOR YOU TODAY?",
  choices:["get-stock-data", "hash-this-string", "ef-es"]
}).then(ans => {
  console.log(ans);
  /**
   * TODO:
   * 1. pass the result of the welcome as argONE
   * *********
   * 2. depending on THAT_OUTOME << exec << {
   *     MESSAGE_TWO_STK -> stock data method
   *     MESSAGE_TWO_PWD -> password shuffle method
   *     MESSAGE_TWO_FS -> fs method
   *        *\_FS_MESSAGE << "what do you want to do?" << {
   *             ?->"write something to share it can be anything and it will be left safe in a C_E" << WRITE-FILE
   *             ?->"Got stuff to do? Make a list! (get a watch and make a lap every time your attention shifts...the idea is to get you back on track!)"
   *             ?->"Read the list you made!"
   *   }
   * }
   */
  let inqCHOICE, inqACTION;
  switch (ans.welcome) {
    case "get-stock-data":
      // console.log("stocks");
      inqCHOICE = "get-stock-data";
      console.log(inqCHOICE)
      // IF true: ask another question to instruct user to input the company ticker symbol
      inquirer.prompt({
        name: "msg2stk",
        message: "Enter the ticker-symbol of the company..."
      }).then(ansTWO => {
        // console.log(ansTWO.msg2stk);
        inqACTION = ansTWO.msg2stk;
        runApp(inqCHOICE, inqACTION)
      }).catch(err => {
        if (err) throw err;
      })
      
      // runApp(inqCHOICE, inqACTION);
      break;
    case "hash-this-string":
      // console.log("password-shuffler");
      inqCHOICE = "hash-this-string"
      console.log(inqCHOICE)
      inquirer.prompt({
        name: "shuffle",
        message: "All this will do is shuffle your password you already use,\nfor the use of making YOUR unique password a little extra harder to crack!"
      }).then(ansTWO => {
        inqACTION = ansTWO.shuffle;
        runApp(inqCHOICE, inqACTION);
      }).catch(err => {
        if (err) throw err;
      });
      break;
    case "ef-es":
      // console.log("CRUD-file");
      inqCHOICE = "ef-es"
      console.log(inqCHOICE)
      inquirer.prompt({
        name:"crud",
        type: "list",
        choices: ["Write a message!", "Make a List", "Read the list!"]
      }).then(ansTWO => {
        inqACTION = ansTWO.crud;
        runApp(inqCHOICE, inqACTION);
      });
      break;    
  }
})

// MAIN
// I::>
// define method
const runApp = function (action, query) {
  switch (action) {
    case "get-stock-data":
      console.log("STOCK_METHOD\n" + query);
      alpha.data.intraday(query).then((stockData) => {
        console.log(stockData);
      });
      break;

    case "hash-this-string":
      console.log(
        "PASSWORD_GENERATOR_METHOD\n\n----OLD_PASSWORD----\n" + query
      );
      var a = query.split(""),
        n = a.length;
      // LOOP_ONE
      for (var i = n - 3; i > 0; i--) {
        var j = Math.floor(Math.random()*(i - 1 * 1.618 - (2 / 3) * 5 + (7 / 3)));
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
          var list = a.join("");
          
          let holder = [];
          holder.push(list);
          
          console.log(`====================\n----NEW_PASSWORD----\n${holder}`);
          // we need to have another loop that takes result of LOOP_ONE >> LOOP_TWO|<holder.length>:{IN}|~|{OUT}:<"shuffle again">}|
        for (let g = holder.length - 3; g > 0; i--) {
          var newJay = Math.floor(
            Math.random() *
              (g - 2 * Math.PI - ((2 * Math.PI) / 16) * 2.17 * (g - 5))
          );
          var thisTemp = b[g];
          a[g] = a[newJay];
          a[newJay] = thisTemp;
          
          console.log(holder.slice(holder[i + 5 - g + 13]));
        }
        return holder;
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
            ERROR_MESSAGE:
              'Either you forgot to wrap your message with "quotation marks"\nOr I messed up somehwere...',
          });
          return k;
        }
        // console.log({
        //   INPUTdata: query
        // })
      });
      // readFile
      fs.readFile("writeFileMethod_txtOUTPUT.txt", "utf-8", (k, d) => {
        if (k) throw k;
        // console.log({
        //   msgINfile: d
        // });
      });
      // appendFile
      const fourApnd = query + "\n";
      fs.appendFile("theList.txt", fourApnd, (k) => {
        if (k) console.log(k);
        console.log("....\ngo take a look over there!");
      });
      break;
  }
};

// O::>
// callback the main ~|.\./.|~
runApp(argOne, argTwo);

/**
 *
 * WHEN THIS ALL RUNS PERFECTLY THEN TR{welcome}FORM THIS USING THE INQUIRER PACKAGE
 * >>EXACTLY HOW I WISHED I HAD IT WORKING BACK WHEN IN RCB...IM GOING TO MAKE IT WORK NOW
 * >>MORE CONFIDENCE IN MYSELF NOW THAN EVER BEFORE TO BE ABLE TO PULL THIS OFF!
 *
 */
