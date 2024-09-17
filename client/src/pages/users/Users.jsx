import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { NoPage } from '../NoPage';

export function Users() {
  const { role, username } = useContext(GlobalContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setUsers(data.data);
        }
      })
      .catch(err => console.error(err))
  }, []);

  if (role !== 'admin') {
    return <NoPage />;
  }

  function actionStatus(userId, status) {
    fetch('http://localhost:3001/api/users/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userId, status }),
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setUsers(pre => pre.map(user => user.id === userId ? { ...user, is_blocked: status } : user))
        }
      })
      .catch(err => console.error(err))
  }

  const Block = ({ userId }) => <button onClick={() => actionStatus(userId, true)} className='btn btn-danger rounded-pill py-1 px-3'>Ban</button>;
  const Unblock = ({ userId }) => <button onClick={() => actionStatus(userId, false)} className='btn btn-primary rounded-pill py-1 px-3'>Unban</button>

  return (
    <div className="container">
      <div className="pt-3 pb-2 mb-3">
        <h1 className="h2 mt-5 text-center">Welcome admin {username}</h1>
      </div>
      <div>
        <h2>All users</h2>
      </div>
      <div className="table-responsive-lg min-vh-100">
        <table className="table table-striped">
          <thead className='table-dark'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th className='text-end' scope="col">Actions</th>
            </tr>
          </thead>
          {users.length === 0 ? <thead><tr><th>Empty</th></tr></thead> : <tbody>
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role[0].toUpperCase() + user.role.slice(1)}</td>
                  <td>
                    {user.is_blocked
                      ? <span className="badge text-bg-danger rounded-pill">Blocked</span>
                      : <span className="badge text-bg-success rounded-pill">Active</span>}
                  </td>
                  <td className='text-end'>
                    {user.is_blocked ? <Unblock userId={user.id} /> : <Block userId={user.id} />}
                  </td>
                </tr>
              ))
            }
          </tbody>}
        </table>
      </div>
    </div>
  )
}