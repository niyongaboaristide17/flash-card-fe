import {
  ApolloClient,
  ApolloProvider,
  from, HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from "./routes/AllRoutes";
import GlobalSnackbar from "./components/snackbar/GlobalSnackbar";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://aristide-flash-card.herokuapp.com/' })
])

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
})

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: link
// })

function App() {
  return (
    <>
      <GlobalSnackbar/>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </ApolloProvider>
    </>

  );
}

export default App;
