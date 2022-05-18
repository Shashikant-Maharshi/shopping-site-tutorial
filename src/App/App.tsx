import { AiOutlineShoppingCart } from "react-icons/ai";
import Header from 'Header/Header';
import useApp from 'App/app.hook';
import UserList from 'UserList/UserList';
import ProductLibrary from 'ProductLibrary/ProductLibrary';
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
      <ProductLibrary user={user?.args} />
    </div>
  );
}

export default App;
