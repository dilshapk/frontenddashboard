import React, { useState, useEffect } from 'react';
import API from '../api';

export default function UserPanel() {
  const [allUsers, setAllUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    API.get('users/').then(res => setAllUsers(res.data));
    API.get('permissions/').then(res => setPermissions(res.data));
  }, []);

  return (
    <div className="border rounded shadow-sm bg-white p-3">
      <h5 className="mb-3">User & Permissions Panel</h5>
      
      <button className="btn btn-success mb-3"
        onClick={async () => {
          const email = prompt('New user email?');
          if (!email) return;
          const u = await API.post('register/', { email, username: email.split('@')[0] });
          alert(`User created: ${u.data.email}, pass: ${u.data.generated_password}`);
          setAllUsers([...allUsers, u.data]);
        }}>Create New User</button>

      <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="form-select mb-3">
        <option value="">Select User...</option>
        {allUsers.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
      </select>

    
      {selectedUser && (
        <div>
          <h6>Permissions for {allUsers.find(u => u.id.toString() === selectedUser).email}</h6>
          {["Products List","Marketing List","Order List","Media Plans","Offer Pricing SKUs","Clients","Suppliers","Customer Support","Sales Reports","Finance & Accounting"]
            .map(page => {
              const key = page.toLowerCase().split(' ').join('_');
              const existing = permissions.find(p => p.user == selectedUser && p.page === key);
              const initial = existing ? existing : { can_view: false, can_edit: false, can_create: false, can_delete: false };
              return (
                <div key={page} className="border rounded p-2 mb-2">
                  <strong>{page}</strong>
                  {["view","create","edit","delete"].map((perm)=>
                    <div key={perm} className="form-check form-check-inline ms-2">
                      <input type="checkbox" className="form-check-input"
                        defaultChecked={initial["can_"+perm]}
                        onChange={e => {
                          API.post('permissions/', {
                            user: selectedUser,
                            page: key,
                            can_view: initial.can_view,
                            can_edit: initial.can_edit,
                            can_create: initial.can_create,
                            can_delete: initial.can_delete,
                            ["can_"+perm]: e.target.checked
                          }).then(() => API.get('permissions/').then(res => setPermissions(res.data)));
                        }}
                      />
                      <label className="form-check-label">{perm}</label>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
