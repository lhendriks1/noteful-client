import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ErrorBoundary from '../../ErrorBoundary';
import ApiContext from '../../ApiContext'
import config from '../../config';
import {getNotesForFolder, findNote, findFolder} from '../../notes-helpers';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    static defaultProps = {
      match: {
        params: {}
      }
    }

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
      console.log('handleDeleteNote called')
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      });
    };

    handleAddFolder = folder_title => {
      this.setState({
        folders: [...this.state.folders, folder_title]
      })
    }

    handleAddNote = newNote => {
      console.log('update state with', newNote);
      this.setState({
        notes: [...this.state.notes, newNote]
      })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={props =>
                          <ErrorBoundary>
                            <NoteListNav {...props} />
                          </ErrorBoundary> }
                    />
                ))}
                <Route path="/note/:note_id"
                  render={props =>
                    <ErrorBoundary>
                      <NotePageNav {...props}/>
                    </ErrorBoundary>
                    }
                />
                <Route path="/add-folder"
                    render={props =>
                    <ErrorBoundary>
                      <NoteListNav {...props}/>
                    </ErrorBoundary>
                }
                />
                <Route path='/add-note'
                  component={NotePageNav}
                />
            </>
        );
    }

    renderMainRoutes() {
        return (
              <>
                  {["/", "/folder/:folder_id"].map(path => (
                      <Route
                          exact
                          key={path}
                          path={path}
                          render={props =>
                            <ErrorBoundary>
                              <NoteListMain {...props}/>
                            </ErrorBoundary>
                          }
                      />
                  ))}
                  <Route
                      path="/note/:note_id"
                      render={props =>
                        <ErrorBoundary>
                          <NotePageMain {...props}/>
                        </ErrorBoundary>
                      }
                  />
                  <Route
                    path="/add-folder"
                    render={props =>
                      <ErrorBoundary>
                        <AddFolder {...props} />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/add-note"
                    render={props =>
                      <ErrorBoundary>
                        <AddNote {...props} />
                      </ErrorBoundary>
                    }
                  />
              </>
        );
    }

    render() {
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.handleDeleteNote,
        addFolder: this.handleAddFolder,
        addNote: this.handleAddNote
      }
        return (
          <ApiContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
