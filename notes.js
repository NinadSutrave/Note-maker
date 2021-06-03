const chalk = require('chalk')
const fs = require('fs') 

/**
 * File System is a node js package included 
 * It contains neccessary functionality to carry 
 * out file operations
 * 
 * In this app we will be using its read/write functions
 * 
 * readFileSync('file'):                in loadNotes()
 * writeFileSync('file', data):         in saveNotes()
 * 
 */


const addNote = (title, body) => {
    const notes = loadNotes()

    // alternative way of defining a function using function keyword
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })
    // if function has just one line where it returns something then
    // the return keyword can be omitted as well and can be defined as an arrow function

    const duplicateNote = notes.find((note) => note.title === title)
    //returns the first occurence where note title in object matches with given title
    
    if(!duplicateNote) {   // or duplicateNote === undefined
        notes.push ({
            title: title,
            body: body
        })
    
        saveNotes(notes)

        console.log(chalk.bgGreen('New note added!'))
    }
    else {
        console.log(chalk.bgRed('Note title taken!'))
    }

}

const removeNote = (title) => {

    const notes = loadNotes()

    const keep = notes.filter((note) => note.title !== title)
    const remove = notes.filter((note) => note.title === title)
    //traverses through the array and extracts elements where condition is satisfied
    //thus keep is now an array with tasks that would remain
    //and remove is now an array with tasks to be removed

    if(remove.length !== 0) {
        saveNotes(keep)
        console.log(chalk.bgGreen('Note removed!'))
    }
    else {
        console.log(chalk.bgRed('Note not found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.bold.rgb(100, 100, 200)('Your notes ...'))
    console.log(chalk.bold.underline.cyan('Note\t\t\tBody'))

    notes.forEach((note) => {
        console.log(note.title + '\t\t\t' + note.body)
    })
    //as name suggests, traverses thoughout the function
}

const readNote = (title) => {

    const notes = loadNotes()

    const noteToRead = notes.find((note) => note.title === title)

    if(noteToRead) {
        console.log(noteToRead.body)
    }
    else {
        console.log(chalk.bgRed('Note title not found!'))
    }

}

/**
 * JSON - JavaScript Object Notation
 * 
 * This is a lightweight syntax for storing and transporting data
 * Because of its similarity to the JavaScript code for creating objects,
 * it is easy to convert JSON data into native JavaScript objects
 * 
 * Exploiting this, I am storing all the notes in our system 
 * as a notes.json file
 * 
 * JSON.stringify(value) -> converts a valid JavaScript value to JSON string
 * JSON.parse(value) -> converts a valid JSON string to Javascript object
 * 
 */

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    /**
     * For initially kick starting the app, if the notes.json
     * file does not exist this block of code would return an error
     * 
     * To prevent that we place the code in a try catch block
     * so that the code creates a notes.json file by itself 
     * if it doesn't find one
     *  
     */
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

/**
 * For the require keyword to be used, the module must export its contents that
 * would be needed for usage
 * 
 * We can choose what members we choose to export outside this file and export 
 * them as an object
 */