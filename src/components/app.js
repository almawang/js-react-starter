import React, { Component } from 'react';
import Immutable from 'immutable';
import NoteBar from './noteBar';
import Note from './note';
import * as firebasedb from '../firebasedb';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      undo: Immutable.Stack(),
    };
    this.undoChange = this.undoChange.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes), undo: this.state.undo.unshift(notes) });
    });
  }

  undoChange() {
    firebasedb.undoChange(this.state.undo.first());
  }

  render() {
    const getNotes = this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Note
          note={note}
          id={id}
          deleteNote={firebasedb.deleteNote}
          moveNote={firebasedb.moveNote}
          changeText={firebasedb.updateNoteText}
          changeTitle={firebasedb.updateNoteTitle}
        />);
    });
    return (
      <div id="app">
        <NoteBar addNote={firebasedb.addNote} undoChange={this.undoChange} />
        <div id="notesSet">
          {getNotes}
        </div>
      </div>

    );
  }
}

export default App;
