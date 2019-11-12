import React, { Component } from 'react'
import Note from '../Note/Note'
import ApiContext from '../../ApiContext'
import { findNote } from '../../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends Component {
  static contextType = ApiContext;
  static defaultProps = {
    match: {
      params: {}
    }
  }

  handleDeleteNote = note_id => {
    this.props.history.push('/')
  }

  render() {
    const { note_id } = this.props.match.params;
    console.log(note_id)
    const { notes=[] } = this.context;
    console.log(this.context)
    console.log(notes)
    const note = findNote(notes, note_id) || {context: ''}
    console.log(note)
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          note_title={note.note_title}
          date_modified={note.date_modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.note_content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

