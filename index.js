//NPM packages first || parent_imports
// DOTENV FIRST FOR NO EVNIRONEMT_OVERLAPPING WITH OTHER PACKAGE IMPORTS
// require('dotenv').config();
const axios = require('axios');
const inquirer = require('inquirer');
// child_imports || HELPERS
// CLI-ARGS
const argOne = process.argv[2];
const argTwo = process.argv[3];
console.log(`argOne: ${argOne}`);
console.log(`argTwo: ${argTwo}`);


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
 * @-the MAIN:<:< function (action, query){
 *  SWITCH<~>action
 *      >>> look up stock data
 * // stocks api?
 * // axios fetch
 *      >>> password-hasher-generator
 * // take input string, generate input (n) that returns (n*phi) * (random number picked from range 0 to 1618)^e(Pi)....then cos(result) then cot(cos_res)
 *      >>> fs-module-method to create/read/delete file
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

// O::>
// callback the main ~|.\./.|~