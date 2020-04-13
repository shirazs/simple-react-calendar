import React from 'react';
import {render} from 'react-dom';
import {Calendar} from './Calendar';

const styles = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  textAlign: 'center',
  marginTop: '5vh',
  MozOsxFontSmoothing: 'grayscale',
};

const App = () => {
  return (
    <div style={styles}>
      <Calendar />
    </div>
  );
};

render(<App />, document.getElementById('root'));
