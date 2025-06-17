import React, { useEffect, useState } from 'react';
import API from '../api';

function CommentSection({ page }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    const res = await API.get(`/comments/${page}/`);
    setComments(res.data);
  };

  const handleSubmit = async () => {
    if (!text) return;
    await API.post(`/comments/${page}/`, { text });
    setText('');
    fetchComments();
  };

  const handleDelete = async (id) => {
    await API.delete(`/comments/${page}/${id}/`);
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  return (
    <div>
      <h5>Comments</h5>
      <textarea
        className="form-control mb-2"
        placeholder="Write comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>Post</button>

      <ul className="list-group">
        {comments.map(comment => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={comment.id}>
            <span>{comment.text} <small className="text-muted">({comment.user.username})</small></span>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;



