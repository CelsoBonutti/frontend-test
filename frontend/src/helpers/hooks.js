import { useState, useEffect } from "react";

export function useToggler(initialState) {
  const [state, setState] = useState(initialState);

  const setTrue = () => setState(true);

  const setFalse = () => setState(false);

  const toggle = () => setState(!state);

  return [state, setTrue, setFalse, toggle];
}

export function useGET(url, options) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        const rawResponse = await fetch(url, {
          ...options,
          method: "GET" //prevents people from being funny
        });
        const data = await rawResponse.json();
        setData(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [loading, options, url]);

  const refetch = () => {
    setLoading(true);
  };

  return [data, loading, refetch];
}
