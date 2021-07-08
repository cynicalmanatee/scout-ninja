import { render } from '@testing-library/react';
import React, {useState} from 'react';
import asyncLoading from 'react-async-loader';
import GoogleStreetview from './GoogleStreetview';

// eslint-disable-next-line react/prop-types
function SplitView({ googleMaps }) {
  const [coord, setCoord] = useState("your coordinates will appear here");

  return(
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      alignItems: 'stretch',
      height: '70vh',
    }}
  >
      <div style={{ flexGrow: 1 }}>
        <GoogleStreetview googleMaps={googleMaps} changeCoord={coord => setCoord(coord)} />
      </div>
      <div>
        <h1>{coord}</h1>
      </div>
    </div>
  );
};

const mapScriptsToProps = ({ apiKey }) => ({
  googleMaps: {
    globalPath: 'google.maps',
    url: `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCQpoAKuSc17eoy2rSpYY_sICaUxUk2tMU"}`,
    jsonp: true,
  },
});

export default asyncLoading(mapScriptsToProps)(SplitView);