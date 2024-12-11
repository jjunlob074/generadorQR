import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';  

const QRCodeGenerator = () => {
  const [text, setText] = useState('');  // Estado para almacenar el texto o URL

  // Función para manejar el cambio en el input
  const handleInputChange = (event) => {
    setText(event.target.value);  
  };

  // Función para descargar el código QR como una imagen
  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');  
    const data = new XMLSerializer().serializeToString(svg);  
    const blob = new Blob([data], { type: 'image/svg+xml' }); 
    const link = document.createElement('a');  
    link.href = URL.createObjectURL(blob); 
    link.download = 'qr-code.svg';  
    link.click();  
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Generador de Códigos QR</h1>
      <input
        type="text"
        placeholder="Ingresa el texto o URL"
        value={text}
        onChange={handleInputChange}
        style={{ padding: '10px', marginBottom: '20px' }}
      />
      <div style={{ marginTop: '20px' }}>
        {text && (
          <div id="container-qr">
            <QRCodeSVG
                id="qr-code-svg"
                value={text}
                size={256}
                />
            {/* Aquí generamos el QR en formato SVG */}
            <button
              onClick={downloadQRCode}
              style={{ padding: '10px', marginTop: '20px' }}
            >
              Descargar QR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
