import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react';


interface prop {
title: string
}
function App({title}: prop): JSX.Element {
  return (
    <div >
      Proyecto {title}
      <Button variant="primary">Aremar</Button>
    </div>
  );
}

export default App;
