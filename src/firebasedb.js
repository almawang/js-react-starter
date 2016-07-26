import firebase from 'firebase';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBh5aHT_Fno_AN_tEBJYDrc7Qd5gAXoiA4",
  authDomain: "note-app-8476d.firebaseapp.com",
  databaseURL: "https://note-app-8476d.firebaseio.com",
  storageBucket: "note-app-8476d.appspot.com",
};
firebase.initializeApp(config);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function fetchUndo(callback) {
  firebase.database().ref('undo').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function addNote(text) {
  const note = {
    title: '',
    text,
    x: 400,
    y: 12,
  };
  firebase.database().ref('notes').push(note);
}

export function deleteNote(id) {
  firebase.database().ref('notes').child(id)
  .remove();
}

export function moveNote(id, x, y) {
  firebase.database().ref('notes').child(id)
  .update({ x, y });
}

export function updateNoteText(id, text) {
  firebase.database().ref('notes').child(id)
  .update({ text });
}

export function updateNoteTitle(id, title) {
  firebase.database().ref('notes').child(id)
  .update({ title });
}

export function undoChange(notes) {
  firebase.database().ref('notes').update(notes);
}
