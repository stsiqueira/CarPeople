
import './App.css';
import 'antd/dist/antd.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CarPeople from './components/routes/CarPeople';
import ShowPage from './components/routes/ShowPage';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" >
          <CarPeople />
        </Route>
        <Route path="/people/:id" >
          <ShowPage />
        </Route>
      </Router>

    </ApolloProvider>
  )
}

export default App;
