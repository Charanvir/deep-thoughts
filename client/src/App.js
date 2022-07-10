import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
// will retrieve the token from localStorage and include it in every request to the API
// essentially creating a middleware function that will retrieve the token for us and combine it with the existing httpLink
import { setContext } from '@apollo/client/link/context'
// BrowserRouter, Routes and Route are components that the React Router library provides
// BrowserRouter is being renamed as Router in this case
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Singup from './pages/Signup';

const httpLink = createHttpLink({
  // uniform resource identifier
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* makes all of the child components aware of the client-side routing that can take place now */}
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header></Header>
          <div className='container'>
            {/* Routes can hold several Route components */}
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='/signup' element={<Singup></Singup>}></Route>

              <Route path="/profile">
                {/* when profile is routed to, it will check for a username */}
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>

              <Route path='/thought/:id' element={<SingleThought></SingleThought>}></Route>

              <Route path='*' element={<NoMatch></NoMatch>}></Route>
            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
