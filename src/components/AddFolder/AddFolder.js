import React, { Component } from 'react';
import config from '../../config';
import ApiContext from '../../ApiContext';
import '../../Form.css';

export default class AddFolder extends Component{
  constructor(props) {
    super(props);
    this.state = {
      folder_title: '',
      error: false,
    }
  }

  static contextType = ApiContext;

  handleSubmit(event) {
    event.preventDefault();
    const { folder_title } = this.state;
    this.addFolder(folder_title);
  }

  updateFolderName(folder_title) {
    this.setState({folder_title: folder_title})

  }

  validateFolderName() {
    const {folder_title} = this.state;
    if(folder_title.length === 0)
    return 'Folder name is required';
  }

  addFolder(folder_title) {
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify({'folder_title': folder_title}),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))}
        return res.json()
      })
      .then((resJson) => {
        let newFolder = {'id': resJson.id, 'folder_title': folder_title};
        this.context.addFolder(newFolder)
      })
      .then(() => {
        this.setState({
          folder_title: {
            value: ''},
          error: false,
        })
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
        this.setState({
          error: 'Something went wrong; please try again later'
        })
      })
  }


  render() {
    const {error} = this.state;
    return(
      <form className='addFolder' onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Create New Folder</h2>
        <fieldset>
          <legend>New Folder Details</legend>
          <label htmlFor='newFolder' name='newFolder' className='form__controls'>
          New folder name:
          </label>
          <input type='text' id='newFolder'
            ref={this.folderNameInput}
            onChange={e => this.updateFolderName(e.target.value)}/>
          <div className='form__button__group'>
            <button
              type='submit'
              className='form__submit'
              disabled={this.validateFolderName()}
              >
              Submit
              </button>
            <button
              type='reset'
              className='form__cancel'
              onClick={() => this.props.history.push('/')}
              >
              Cancel
            </button>
          </div>
          {error && <p className='errorMessage'>{error}</p>}
        </fieldset>
      </form>
    );
  };
}
