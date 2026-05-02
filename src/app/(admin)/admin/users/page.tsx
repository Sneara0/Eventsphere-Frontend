"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users?page=${page}&search=${search}`)
      .then(res => setUsers(res.data.users))
  }, [page, search])

  return (
    <div className="p-8 space-y-4">
      <input 
        type="text" 
        placeholder="Search users..." 
        className="p-3 bg-muted rounded-xl w-full max-w-sm"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="border rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4 text-muted-foreground">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setPage(p => p - 1)} className="px-4 py-2 border rounded-lg">Prev</button>
        <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 border rounded-lg">Next</button>
      </div>
    </div>
  )
}