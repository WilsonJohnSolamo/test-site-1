import Link from 'next/link';
import { useFetchUsers } from './api';

export default function Home() {
  const { users, isLoading, isError } = useFetchUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }
// testing
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <Link href={`/user/${user.id}`}>
              <h3>{user.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
