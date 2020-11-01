import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import {useStateValue} from './contextAPI/StateProvider'
import "./App.scss";
import Widgets from "./components/Widgets";
import Login from "./components/Login";

function App() {
  const [{user}] = useStateValue()
  
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
