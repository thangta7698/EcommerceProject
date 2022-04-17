import { Route, Switch } from 'react-router';
import Header from './components/Header';
import ProductFeature from './features/Product';

function App() {


  return (
    <div className="app">
      <div>
        <Header />
        <Switch>
          <Route path='/products' component={ProductFeature} />
        </Switch>
      </div>


    </div >
    
  );
}

export default App;
