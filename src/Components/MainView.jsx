import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

const MainView = () => {
  const [startLocationNumber, setStartLocationNumber] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const observer = useRef();

  const lastLocationElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getLocations();
      }
    });
    if (node) observer.current.observe(node);
  });

  const getLocations = () => {
    setLoading(true);
    axios
      .post(
        '/v2/confidence/locations',
        {
          start: startLocationNumber,
          limit: 3,
        },
        {
          headers: {
            Username: 'amitphatak$r5labs.com',
          },
        }
      )
      .then((res) => {
        setLocations((locations) => locations.concat(res.data.locations));
      })
      .catch((error) => {
        alert(error.response.status);
      })
      .finally(() => {
        setStartLocationNumber(startLocationNumber + 3);
        setLoading(false);
      });
  };
  useEffect(() => getLocations(), []);
  return (
    <>
      <header className="header">
        <h1>Locations App</h1>
      </header>
      <main className="main">
        <>
          <div className="locations">
            <h2>Location Details</h2>
            <h2>Address</h2>
            <h2>Location Type</h2>
          </div>

          {locations.map((loc, index) => {
            return (
              <div className="locations__locations" key={loc.locationName}>
                <div className="locations__name">
                  <h3>{`${index + 1}. Location Name: `}</h3>
                  <span>{loc.locationName}</span>
                </div>
                <div className="locations__name">
                  <h3>{`${index + 1}. Address: `}</h3>
                  <span>{`${loc.address.addressLine1}, ${loc.address.city}, ${loc.address.state}, ${loc.address.zip},`}</span>
                </div>
                <div className="locations__name">
                  <h3>{`${index + 1}. Location Type: `}</h3>
                  <span ref={lastLocationElementRef}>{loc.locationType}</span>
                </div>
              </div>
            );
          })}
        </>

        {loading && (
          <img
            data-testid="loading"
            className="loading"
            src="https://c.tenor.com/On7kvXhzml4AAAAC/loading-gif.gif"
            alt="loading"
          />
        )}
      </main>
    </>
  );
};

export default MainView;
