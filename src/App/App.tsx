import { AiOutlineShoppingCart } from "react-icons/ai";
import Header from 'Header/Header';
import useApp from 'App/app.hook';
import UserList from 'UserList/UserList';
import './App.scss';

function App() {
  const {
    user,
    setUser,
    usersQuery,
    usersLookup,
  } = useApp();

  return (
    <div className="container">
      <Header title="Smart Hardware Shop">
        {user && (
          <span className="badge">{user.args.role}</span>
        )}
        <UserList
          selected={user}
          onSelect={(userId: string | number) => setUser(usersLookup[userId])}
          isLoading={usersQuery.isLoading}
          isError={usersQuery.isError}
          users={usersLookup}
        />
        <AiOutlineShoppingCart />
      </Header>
      <div className='flex-fluid'>
        <ul>
          {Array(500).fill(null).map((_, idx) => (
            <li key={idx}>{`item ${idx}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
