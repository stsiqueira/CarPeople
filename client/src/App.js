
import './App.css';
import PeopleCards from './components/lists/PeopleCards';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Forms from './components/forms/Forms';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="wrapTitle">
          <h1> GraphQL assignment - Car & People</h1>
        </div>
          <Forms />
        <PeopleCards />
      </div>
    </ApolloProvider>
  )
}

export default App;
