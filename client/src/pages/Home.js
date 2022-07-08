import React from 'react';
// will allow us to make requests to the GraphQL server we connected to and make available to the application using the ApolloProvider component in App.js 
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query requests
  const { loading, data } = useQuery(QUERY_THOUGHTS)

  // optional chaining, negates the need to check if an object exists before accessing its properties
  // if data exists, store it in thoughts, if undefined, then save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts)


  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)"></ThoughtList>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
