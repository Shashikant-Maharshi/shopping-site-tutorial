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
      </Header>
      {!user?.args ? (
        <h3 style={{margin: "1em"}}>Please choose an user account.</h3>
      ) : (
        <ProductLibrary user={user?.args} />
      )}
    </div>
  );
}

export default App;
