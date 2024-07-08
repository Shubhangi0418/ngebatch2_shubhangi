import { useEffect, useState } from "react";

export default function EffectsDemo() {
  const [users, setUsers] = useState([]);

  async function getData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.json();
    } catch (e) {
      console.log("error", e);
    }
  }
  useEffect(() => {
    /*  fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.log("error", e)); */
    getData().then(setUsers);
  }, []);
  if (users.length == 0) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user?.email}</li>
        ))}
      </ul>
    </>
  );
}
