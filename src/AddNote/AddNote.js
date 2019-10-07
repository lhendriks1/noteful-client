import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import '../Form.css';

export default class AddNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      folderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
      modified: new Date(),
      error: false,
    };
  }

static contextType = ApiContext;

  handleSubmit(event) {
    event.preventDefault();
    const newNote = this.state;
    this.addNote(newNote);
  }

  updateName(noteName) {
    this.setState({
      name: noteName
    })
  };

  validateNoteName() {
    if(this.state.name.trim().length === 0) {
      return true;
    }
  }


  updateContent(noteContent) {
    this.setState({
      content: noteContent
    })
  };

  updateFolder(folder) {
    console.log(folder);
    this.setState({
      folderId: folder
    })
  };

  addNote(newNote) {
    console.log(newNote);
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => Promise.reject(error))}
        return res.json()
      })
    .then(resJson => {
      const newNoteObj = {...newNote, id: resJson.id};
      this.context.addNote(newNoteObj);
    })
    .then(()=> {
      this.setState({
        noteName: '',
        noteContent: '',
        folderId: 'Important',
        error: false
      });
      this.props.history.push('/')
    })
    .catch(error => {
      console.log(error);
      this.setState({
        error: true
      })
    })
  }

  ErrorMessage = () => {
    if(this.state.error) {
      return (
      <div className='errorMessage'>
      Something went wrong; please try again later.
      </div>
      )
    };
    return <></>
  }


  render() {
    const {folders=[]} = this.context;
    const folderOptions = folders.map(folder =>
      <option key={folder.id} value={folder.id}>
        {folder.name}
      </option>);

    return (
      <form className='addNote' onSubmit={(e) => this.handleSubmit(e)}>
      <h2>Create New Note</h2>
        <fieldset>
          <legend>New Note Details</legend>
          <div className='form-group__control'>
            <label htmlFor='name' className='form__controls'>Name</label>
            <input type='text' id='name' name='name' onChange={(e => this.updateName(e.target.value))}/>
          </div>
          <div className='form-group__control'>
            <label htmlFor='content' className='form__controls'>Content</label>
            <textarea id='content' name='content' placeholder='Note content...' onChange={(e => this.updateContent(e.target.value))}></textarea>
          </div>
          <div className='form-group__control'>
            <label htmlFor='folder' className='form__controls'>Folder</label>
            <select id='folder' name='folder' onChange={(e => this.updateFolder(e.target.value))}>
            {folderOptions}
            </select>
          </div>
          <div className='form__button__group'>
            <button
              type='submit'
              className='form__submit'
              disabled={this.validateNoteName()}
              >
              Add Note
            </button>
            <button
              type='reset'
              className='form__cancel'
              onClick={() => this.props.history.push('/')}
              >
              Cancel
            </button>
          </div>
        </fieldset>
        {this.ErrorMessage()}
      </form>
    );
  }
}

AddNote.propTypes = {

}
