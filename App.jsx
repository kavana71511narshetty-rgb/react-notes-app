
import { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  function saveNote(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please enter both a title and note content.');
      return;
    }

    if (editingId !== null) {
      setNotes(notes.map(note =>
        note.id === editingId
          ? { ...note, title: title.trim(), content: content.trim() }
          : note
      ));
      setEditingId(null);
    } else {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: title.trim(),
          content: content.trim()
        }
      ]);
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
    if (editingId === id) {
      setTitle('');
      setContent('');
      setEditingId(null);
    }

    setNotes(notes.filter(note => note.id !== id));
  }

  function cancelEdit() {
    setTitle('');
    setContent('');
    setEditingId(null);
  }

  return (
    <main className="notes-app">
      <header className="app-header">
        <h1>My Notes</h1>
        <p>Capture your ideas, one note at a time.</p>
      </header>

      <form className="note-form" onSubmit={saveNote}>
        <label htmlFor="note-title">Note title</label>
        <input
          id="note-title"
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <label htmlFor="note-content">Note content</label>
        <textarea
          id="note-content"
          placeholder="Write your note here..."
          rows="4"
          value={content}
          onChange={event => setContent(event.target.value)}
        />

        <div className="form-actions">
          <button type="submit">
            {editingId !== null ? 'Update Note' : 'Add Note'}
          </button>

          {editingId !== null && (
            <button type="button" className="cancel-button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="notes-section">
        <h2>Your Notes ({notes.length})</h2>

        {notes.length === 0 ? (
          <p className="empty-message">No notes yet. Add your first note above!</p>
        ) : (
          <div className="notes-grid">
            {notes.map(note => (
              <article className="note-card" key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>

                <div className="note-actions">
                  <button type="button" onClick={() => editNote(note)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
