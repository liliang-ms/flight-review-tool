import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import Dashboard from './pages/Dashboard';
import FlightDetail from './pages/FlightDetail';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </BrowserRouter>
    </FluentProvider>
  );
}

export default App;
