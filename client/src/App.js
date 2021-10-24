
import './App.css';
import PeopleCards from './components/lists/PeopleCards';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1> GraphQL assignment - Car & People</h1>
        <PeopleCards />
      </div>
    </ApolloProvider>
  )
}

export default App;
