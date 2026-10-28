
import { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  function saveNote(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingId !== null) {
      setNotes(notes.map(note =>
        note.id === editingId
          ? { ...note, title: title.trim(), content: content.trim() }
          : note
      ));
      setEditingId(null);
    } else {
      setNotes([...notes, {
        id: Date.now(),
        title: title.trim(),
        content: content.trim()
      }]);
    }

    setTitle('');
    setContent('');
  }

  function editNote(note) {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setContent('');
    }
  }

  return (
    <main className="app">
      <header>
        <h1>My Notes</h1>
        <p>Create, edit and manage your notes.</p>
      </header>

      <form onSubmit={saveNote} className="note-form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
          required
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your note here..."
          aria-label="Note content"
          required
        />
        <button type="submit">
          {editingId !== null ? 'Update Note' : 'Add Note'}
        </button>
        {editingId !== null && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setTitle('');
            setContent('');
          }}>
            Cancel Edit
          </button>
        )}
      </form>

      <section className="notes">
        <h2>Your Notes ({notes.length})</h2>
        {notes.length === 0 && <p>No notes yet. Add your first note!</p>}

        {notes.map(note => (
          <article className="note" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => editNote(note)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
