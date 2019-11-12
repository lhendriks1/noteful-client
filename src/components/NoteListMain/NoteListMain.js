import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../../ApiContext'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import { getNotesForFolder } from '../../notes-helpers'
import './NoteListMain.css'

export default class NoteListMain extends Component {
  static contextType = ApiContext;
  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {
    const { folder_id } = this.props.match.params;
    const { notes=[] } = this.context;
    console.log(notes)
    const notesForFolder = getNotesForFolder(notes, folder_id);
    console.log(notesForFolder)

    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id ={note.id}
                note_title={note.note_title}
                date_modified={note.date_modified}
                note_content={note.note_content}
                folder_id={folder_id}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}
