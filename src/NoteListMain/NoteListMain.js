import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

export default class NoteListMain extends Component {
  static contextType = ApiContext;
  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {
    const { folderId } = this.props.match.params;
    const { notes=[] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
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
