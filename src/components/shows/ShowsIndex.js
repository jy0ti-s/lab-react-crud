import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAllShows } from '../../api/fetch.js';
import ErrorMessage from "../errors/ErrorMessage";
import ShowListing from './ShowListing.js';
import "./ShowsIndex.css";

function filterShows(search, shows) {
  return shows.fitler((show) => {
    return show.title.toLowerCase().includes(search.toLowerCase());
  });
}

export default function ShowsIndex() {
  const [error, setError] = useState(false);
  const [shows, setShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [allShows, setAllShows] = useState([]);

  function handleTextChange(event) {
    setSearchTitle(event.target.value);
    const result = event.target.value.length
      ? filterShows(event.target.value, allShows)
      : allShows;
    setShows(result);
  }

  useEffect(() => {
    getAllShows()
      .then((response) => {
        setAllShows(response);
        setShows(response);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);
  return (
    <div>
      {error ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Shows</h2>
          <button>
            <Link to="/shows/new">Add a new show</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Shows:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {shows.map((show)=> {
            return <ShowListing show={show} key={show.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
