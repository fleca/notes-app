const fs = require('fs')
const chalk = require('chalk')
const log = console.log

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes)
    log(chalk.green('Note with title: "' + title + '" added!'))
  } else {
    log(chalk.red('Title: "' + title + '" already taken!'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const filteredNotes = notes.filter(note => note.title !== title)
  
  if (filteredNotes.length !== notes.length) {
    saveNotes(filteredNotes)
    log(chalk.bgGreen('Note with title: "' + title + '" removed!'))
  } else {
    log(chalk.bgRed('Note with title: "' + title + '" not found!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  log(chalk.black.bgYellow('Your notes:'))
  notes.forEach(note => log(chalk.yellow(note.title)))
}

const readNote = title => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)

  if (note) {
    log(chalk.bgBlue(title))
    log(chalk.underline.blue(note.body))
  } else {
    log(chalk.red('Note with title: "' + title + '" not found!'))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJsON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}