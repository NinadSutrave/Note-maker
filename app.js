/* require functions are used to include modules
 * that are present in separate files
 **/

const notesUtility = require('./notes.js')

/**
 * notes.js is a file I created that includes all
 * the funtionality required in the app
 * this file needs to be included in app.js in order
 * to use it
 */

const chalk = require('chalk')

/**
 * Chalk is a node js package that contains functionality
 * to style text output in the terminal
 * 
 * Node js packages must be installed before usage
 * 
 * https://www.npmjs.com/package/chalk 
 * 
 */
const yargs = require('yargs')

/****
 * 
 * Yargs is a node js library. To know in detail about any 
 * node js library visit their npm page
 * 
 * https://www.npmjs.com/package/yargs
 * 
 * Yargs helps one build interactive command line tools 
 * by parsing arguments and generating an elegant user 
 * interface.
 * 
 * In this app I will be using its ability to receive 
 * commands defined by me, from the command line
 * 
 */

yargs.version('1.1.0')


/** 
 * The prototype of the function being used,
 * yargs.command(cmd, desc, [builder], [handler])
 * 
 * hover over function for more info
 * 
 * cmd -> name of command ( string )
 * desc -> description of the command ( string )
 * builder -> defines the options our command accepts ( object or function )
 * handler -> function to carry out the command ( function with argv object being passed )
 * 
 * **/


//the first command being defined is 'add'
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    //it adds a new note to your collection

    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    }, 
    /* this block states that while using the add command 
     * we need to specify both the title and the body of the note
     * demandOption: true  -> ensures that it must always be given
     */

    handler(argv) {
        notesUtility.addNote(argv.title, argv.body)
    }
})

//the second command being defined is 'remove'
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    //it removes a note from your collection

    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    /* this block states that while using the remove command 
     * we need to specify only the title of the note
     * demandOption: true  -> ensures that it must always be given
     */

    handler(argv) {
        notesUtility.removeNote(argv.title)
    }
})

//the third command being defined is 'list'
yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    //it lists all the existing notes in your collection

    handler() {
        notesUtility.listNotes()
    }
})

//the fourth command being defined is 'read'
yargs.command({
    command: 'read',
    describe: 'Reading the note',
    //it reads the body of the note

    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: 'string'
        },
    },
    /* this block states that while using the read command 
     * we need to specify only the title of the note
     * demandOption: true  -> ensures that it must always be given
     */

    handler(argv) {
        notesUtility.readNote(argv.title)
    }
})

const argv = yargs.parse()
//console.log(argv)

/**
 * this function parses the arguments we receive through the 
 * command line and stores them in argv as an object
 * 
 * try console.log(argv) to see how it stores them
 */

