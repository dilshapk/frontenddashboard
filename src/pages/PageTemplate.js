import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function PageTemplate() {
  const { pageName } = useParams();
  const pageKey = decodeURIComponent(pageName).toLowerCase().split(' ').join('_');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const nav = useNavigate();

  const load = () => API.get(`comments/${pageKey}/`).then(r => setComments(r.data)).catch(() => nav('/'));

  useEffect(load, [pageKey, nav]);

  const add = async () => {
    await API.post(`comments/${pageKey}/`, { content: newComment });
    setNewComment('');
    load();
  };

  const edit = async (c) => {
    const updated = prompt("Edit comment", c.content);
    if (!updated) return;
    await API.put(`comment/${c.id}/`, { content: updated });
    load();
  };

  const del = async (c) => {
    if (!window.confirm("Delete?")) return;
    await API.delete(`comment/${c.id}/`);
    load();
  };

  return (
    <div className="container mt-4">
      <h3>{decodeURIComponent(pageName)}</h3>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment" rows={3}
        />
        <button className="btn btn-primary mt-2" onClick={add}>Submit</button>
      </div>
      <ul className="list-group">
        {comments.map(c => (
          <li key={c.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <strong>{c.user_email}</strong> <span className="text-muted small">[{new Date(c.created_at).toLocaleString()}]</span>
              <p>{c.content}</p>
            </div>
            <div>
              <button className="btn btn-sm btn-secondary me-1" onClick={() => edit(c)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => del(c)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

