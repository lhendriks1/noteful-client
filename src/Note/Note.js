import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'

export default class Note extends Component {

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    console.log('handleClickDelete called');
    const noteId = this.props.id
    console.log(noteId);

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(error => Promise.reject(error))
      return res.json()
    })
    .then(() => {this.context.deleteNote(noteId)
    })
    .catch(error => {
      console.log({ error })
    })
  }

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={e => this.handleClickDelete(e)}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
