import './App.css';
import { useEffect, useRef } from 'react';
import { mount } from './widget'; // import the mount function

function App() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current) {
      mount(widgetRef.current); // mount the VapiAssistant into the div
    }
  }, []);

  return (
    <>
      <div ref={widgetRef}></div>
    </>
  );
}

export default App;
