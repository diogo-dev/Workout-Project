import { useState, useEffect, useRef } from "react";

export const useNinjaAPI = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const didFetch = useRef(false);

  const getAPIResponse = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers: {"X-Api-Key" : "vSpHANDVEXqfT9mHKMvMpg==9Q3dis8052aSBAva"},
      });
      const answer = await res.json();
      console.log(answer);
      //if the answer.length > 1 than randomly pick an item
      if (answer.length > 1) {
        const randomIndex = Math.floor(Math.random() * answer.length);
        setData(answer[randomIndex]);
      } else {
        setData(answer[0]);
      }
    } catch (err) {
      console.log(err.message)
      setError("An error has ocurred while loading the data!");
    }
    setLoading(false);
  };

  useEffect(() => {
    /* I'm using the useRef to prevent the second call to the API
    because <StrictMode> runs useEffect() twice in development mode */

    if (!didFetch.current) { 
      getAPIResponse();
      didFetch.current = true; 
    }
  }, []);

  return { data, loading, error, getAPIResponse };
}

export default useNinjaAPI