import { useEffect, useState } from "react";
import api from "../services/api";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    api
      .get(url)
      .then(async (response) => {
        const json = await response.data.items;
        setData(json);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);
  return { data, error, isLoading };
};
