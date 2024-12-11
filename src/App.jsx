
import './App.css';
import QRCodeGenerator from './components/QRCodeGenerator';  // Importamos el componente
import QRInfo from './components/QRInfo';

function App() {
  return (
    <div className="App">
      <QRCodeGenerator />  {/* Usamos el componente en la App */}
      <QRInfo />  {/* Usamos el componente en la App */}
    </div>
  );
}

export default App;
