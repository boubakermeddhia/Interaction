import { Route, Switch } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home/home'
import Auth from './components/auth/auth'
import Editprofile from './components/users/editprofile'

function App() {
  return (
    <div>
    <Navbar/>
    <Switch>
          <Route path="/" exact   component={Home}/>
          <Route path="/auth" exact  component={Auth}/>
          <Route path="/editprofile"  exact component={Editprofile}/>
    </Switch>
    </div>
   
  );
}

export default App;
