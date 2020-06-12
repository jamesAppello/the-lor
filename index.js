//NPM packages first || parent_imports
// DOTENV FIRST FOR NO EVNIRONEMT_OVERLAPPING WITH OTHER PACKAGE IMPORTS
// require("dotenv").config(); // removed alpha vantage so we dont need t call our dotenv pkg for now


const inquirer = require("inquirer");
const fs = require("fs");
// child_imports || HELPERS

// CLI-ARGS
const argOne = process.argv[2];
const argTwo = process.argv[3];



// WELCOME to The Lor !
inquirer
  .prompt({
    name: "welcome",
    type: "list",
    message: "Welcome to 'The Lor'\n...\nWHAT COULD I DO FOR YOU TODAY?",
    choices: ["hash-this-string", "ef-es"],
  })
  .then((ans) => {
    console.log(ans);
   
    let inqCHOICE, inqACTION;
    switch (ans.welcome) {
      case "hash-this-string":
        // console.log("password-shuffler");
        inqCHOICE = "hash-this-string";
        console.log(inqCHOICE);
        inquirer
          .prompt({
            name: "shuffle",
            message:
              "All this will do is shuffle your password you already use,\nfor the use of making YOUR unique password a little extra harder to crack!",
          })
          .then((ansTWO) => {
            inqACTION = ansTWO.shuffle;
            runApp(inqCHOICE, inqACTION);
          })
          .catch((err) => {
            if (err) throw err;
          });
        break;
      case "ef-es":
        // console.log("CRUD-file");
        inqCHOICE = "ef-es";
        console.log(inqCHOICE);
        inquirer
          .prompt({
            name: "crud",
            type: "list",
            choices: [
              "Write a message!", 
              "Make a List", 
              "Read the list!"
            ],
          })
          .then((ansTWO) => {
            // moved the decision from the list into a variable instead
            const crudListChoice = ansTWO.crud;
            //switch<~>crudListChoice
            switch (crudListChoice) {
              case "Write a message!":
                // console.log("---> HAVE THE USER INPUT THEIR MESSAGE <---");
                inquirer
                  .prompt({
                    name: "writemsg",
                    message: "WHAT DO YOU WANT TO SAY?",
                  })
                  .then((resp) => {
                    inqACTION = resp.writemsg;

                    console.log(inqCHOICE, `"${inqACTION}"`);
                    runApp(inqCHOICE, `"${inqACTION}"`);
                  })
                  .catch((err) => {
                    if (err) throw err;
                  });
                break;
              case "Make a List":
                // console.log("---> ASK USER FOR THE LABEL OF THEIR LISTTHEN THEY CAN PUT IN THEIR ITEMS...HAVE THEM CONFIRM IF THEY ARE DONE WITH THE LIST...THEN EXECUTE THE CREATION OF THE LIST <---");
                inquirer
                  .prompt({
                    name: "createList",
                    message: "What's your main goal?",
                  })
                  .then((res) => {
                    inqACTION = res.createList;
                    fs.appendFile("taskListLogger.txt", inqACTION, (k) => {
                      if (k) throw k;
                      runApp(inqCHOICE, `"${inqACTION}"`);
                    });
                  })
                  .catch((err) => {
                    if (err) throw err;
                  });
                break;
              case "Read the list!":
                console.log(
                  "---> LIST TO SHOW FILES TO READ....OR TO KEEP IT SHORT && SIMPLE:JUST READ THE USERS LIST <---"
                );
                // make sure to >|>dlt>|> ef-es >> output file "theList.txt" << "lorlog.txt"
                // readFile
                fs.readFile("taskListLogger.txt", "utf-8", (k, d) => {
                  if (k) throw k;
                  console.log({
                    msgINfile: d
                  });
                });
                break;
            }

            // ============ RUN THE METHOD ==============
            // runApp(inqCHOICE, inqACTION);
          })
          .catch((err) => {
            if (err) throw err;
          });
        break;
    }
  });



  
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
        var j = Math.floor(
          Math.random() * (i - 2 * 1.618 - (2 / 3) * 5 + 7 / 3)
        );
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
        var list = a.join("");

        let holder = [];
        holder.push(list);
        console.log(`====================\n----NEW_PASSWORD----\n${holder}`);
        // we need to have another loop that takes result of LOOP_ONE >> LOOP_TWO|<holder.length>:{IN}|~|{OUT}:<"shuffle again">}|
        for (let g = holder.length - 3; g > 0; i++) {
          var newJay = Math.floor(
            Math.random() *
              (g - 2 * Math.PI - ((2 * Math.PI) / 16) * 6.618 * (g - 5))
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

