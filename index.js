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

// WELCOME to The Lor !
inquirer.prompt({
  name:"welcome",
  type:"list",
  message:"Welcome to 'The Lor'\n...\nWHAT COULD I DO FOR YOU TODAY?",
  choices:["get-stock-data", "hash-this-string", "ef-es"]
}).then(ans => {
  console.log(ans);
  /**
   * 
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
        /**
         * atTHISpoint:>:> the cbMTHD returns the value of the selected action from the [crud-choics]
         * e.g. - '[n]' selected outputs the selection as the message
         * *********
         * TODO:
         * 1. we need to add a new prompt based on what option is selected
         * *however: WE SHOULD LOOK AT THE METHOD BEING CALLED FROM THE SWITCH IN THE RUNAPP METHOD
         * ... BECAUSE WE MAY HAVE TO ISOLATE THE THAT SWITCH INTO 3 INDIVIDUAL MEDTHODS
         * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         * NOTES:
         * what does "ef-es" do?
         * ef-es: first takes the action("ef-es") and the query-action(being the message input by user)
         *        then writes the stringArg into a file >> "writeFileMethod_txtOUTPUT.txt"
         *        @ the same time it reads /THAT\-file (* BUT WE CONSOLE LOGGED IT OUT BECAUSE YOU JUST NEED TO GO TO THE FILE TO READ IT *)
         *        && appends the inputfromuser to another file called "theList.txt" 
         * SO:
         * what do we have to change in order to make this the most optimal outcome?
         * --------
         * GIVENS:
         * when prompted at "welcome" if selected "ef-es" a second prompt will show up asking what you want to do.
         * >>> rn inqAction === ansTWO.crud
         * -------
         * STRATEGY:
         * based on that outome we should use another switch on the inqACTION variable:
         * if inqACTION = 
         *        "Write a message!" << ' new prompt for what you want to write ' && maybe:?:make a shuffle of the message an optional suffix-mthd
         *        "Make a List" << ' new prompt for making the list/adding to that list '
         *            ** 
         *         ->    IT WOULD BE A CHERRY ON TOP TO EXTEND THAT CASE MORE FOR ASKING WHAT IS YOUR MAIN TASK 
         *         ->    AND FOLLOWED BY THE ESSENTIAL GIVEN STEPS TO AHCIEVE THAT GOAL, 
         *         ->    AND SET DEADLINES FOR EACH AND MAKE A POINTS SYSTEM AS A RWARD INCEPTIVE OF PODUCTIVITY 
         *            **
         * 
         * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         * ========= >>>>>>>>> " when this is all done we will move out the 'helper functions into another file' << 'modularization' "
         */
        // moved the decision from the list into a variable instead
        const crudListChoice = ansTWO.crud;
        //switch<~>crudListChoice
        switch(crudListChoice) {
          case "Write a message!":
              // console.log("---> HAVE THE USER INPUT THEIR MESSAGE <---");
              inquirer.prompt({
                name: "writemsg",
                message: "WHAT DO YOU WANT TO SAY?"
              }).then(resp => {
                inqACTION = resp.writemsg;

                console.log(inqCHOICE, `"${inqACTION}"`);
                runApp(inqCHOICE, `"${inqACTION}"`);

              }).catch(err => {
                if (err) throw err
              });   
            break;
          case "Make a List":
            console.log("---> ASK USER FOR THE LABEL OF THEIR LISTTHEN THEY CAN PUT IN THEIR ITEMS...HAVE THEM CONFIRM IF THEY ARE DONE WITH THE LIST...THEN EXECUTE THE CREATION OF THE LIST <---");
            break;
          case "Read the list!":
            console.log("---> LIST TO SHOW FILES TO READ....OR TO KEEP IT SHORT && SIMPLE:JUST READ THE USERS LIST <---")
            // make sure to >|>dlt>|> ef-es >> output file "theList.txt" << "lorlog.txt"
            break;    
        }
        



        // ============ RUN THE METHOD ==============
        // runApp(inqCHOICE, inqACTION);
      }).catch(err => { if (err) throw err });
      break;    
  }
})


// MAIN_METHOD
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
      fs.appendFile("lorlog.txt", fourApnd, (k) => {
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
