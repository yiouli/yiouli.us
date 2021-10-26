import { AxiosError } from 'axios';
import HTMLReactParser from 'html-react-parser'; 
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getIndividual } from '../data/fetchers';
import { IndividualData } from '../data/interfaces';

function Individual({ pageId }) {
  const [error, setError] = useState<AxiosError|null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<IndividualData|undefined>(undefined);

  useEffect(() => {
      // https://www.robinwieruch.de/react-hooks-fetch-data
      const func = async () => {
        try {
          const resData = await getIndividual(pageId);
          setData(resData);
          setIsLoaded(true);
        }
        catch (err) {
          setError(err);
          setIsLoaded(true);
        }
      };
      func();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>{data.first_name} {data.last_name}</h1>
        {HTMLReactParser(data.about)}
      </>
    );
  }
}

Individual.propTypes = {
  pageId: PropTypes.number.isRequired,
}

export default Individual;