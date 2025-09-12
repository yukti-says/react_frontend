import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";

export default function App() {
  const [users, setUsers] = useState([]);

  // Fetch 5 random users
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          photo: user.picture.large,
        }));
        setUsers(mapped);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((u, index) => (
          <UserCard key={index} name={u.name} email={u.email} photo={u.photo} />
        ))}
      </div>
    </div>
  );
}

