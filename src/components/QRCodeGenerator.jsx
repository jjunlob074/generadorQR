import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');  // Estado para almacenar el texto o URL
  const [name, setName] = useState('');  // Estado para almacenar el nombre del archivo
  const [savedQRs, setSavedQRs] = useState([]);  // Estado para almacenar los QR guardados
  const [currentPage, setCurrentPage] = useState(0);  // Estado para manejar la página actual

  // Cargar los QR guardados desde localStorage al cargar el componente
  useEffect(() => {
    const storedQRs = JSON.parse(localStorage.getItem('savedQRs')) || [];
    setSavedQRs(storedQRs);
  }, []);

  // Función para manejar el cambio en el input de texto
  const handleInputChange = (event) => {
    setText(event.target.value);  
  };

  // Función para manejar el cambio en el input de nombre
  const handleNameChange = (event) => {
    setName(event.target.value);  
  };

  // Función para guardar el QR en localStorage
  const saveQRCode = () => {
    if (name.trim() === '') {
      alert('Por favor, ingresa un nombre para guardar el QR');
      return;
    }

    const newQRCode = { id: new Date().getTime(), name, text };  // Crear un objeto con un ID único
    const updatedQRs = [...savedQRs, newQRCode];  // Agregar el nuevo QR a la lista
    setSavedQRs(updatedQRs);  // Actualizar el estado
    localStorage.setItem('savedQRs', JSON.stringify(updatedQRs));  // Guardar en localStorage
    setText('');  // Limpiar el campo de texto
    setName('');  // Limpiar el campo de nombre
  };

  // Función para descargar el código QR como una imagen
  const downloadQRCode = (name) => {
    const svg = document.getElementById(`qr-code-svg-${name}`);  
    const data = new XMLSerializer().serializeToString(svg);  
    const blob = new Blob([data], { type: 'image/svg+xml' }); 
    const link = document.createElement('a');  
    link.href = URL.createObjectURL(blob); 
    link.download = `${name}-qr-code.svg`;  
    link.click();  
  };

  // Función para eliminar un QR
  const deleteQRCode = (id) => {
    const updatedQRs = savedQRs.filter((qr) => qr.id !== id);
    setSavedQRs(updatedQRs);
    localStorage.setItem('savedQRs', JSON.stringify(updatedQRs));
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };

  // Funciones para manejar la paginación
  const nextPage = () => {
    if (currentPage < savedQRs.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Generador de Códigos QR</h1>
      <input
        type="text"
        placeholder="Ingresa aquí el contenido que tendrá el QR"
        value={text}
        onChange={handleInputChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Ingresa el nombre que quiere que tenga el QR"
        value={name}
        onChange={handleNameChange}
        style={styles.input}
      />
      <div style={styles.qrContainer}>
        {text && name && (
        
          <div id="container-qr" style={styles.qrWrapper}>
            <QRCodeSVG
              id={`qr-code-svg-${name}`}
              value={text}
              size={256}
              style={styles.qrCode}
            />
            <div style={styles.buttonsContainer}>
              <button
                onClick={() => downloadQRCode(name, text)}
                style={styles.downloadButton}
              >
                Descargar QR
              </button>
              <button
                onClick={saveQRCode}
                style={styles.saveButton}
              >
                Guardar QR
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={styles.savedQRsContainer}>
        {savedQRs.length > 0 && (
           console.log("cp:", currentPage),
          <div>
            <h2 style={styles.savedHeading}>QRs Guardados</h2>
            <div style={styles.savedQRsList}>
              {savedQRs.length > 0 && (
                <div key={savedQRs[currentPage].id} style={styles.savedQRItem}>
                  <QRCodeSVG
                    id={`qr-code-svg-${savedQRs[currentPage].name}`}
                    value={savedQRs[currentPage].text}
                    size={128}
                    style={styles.savedQRCode}
                  />
                  <div style={styles.qrName}>{savedQRs[currentPage].name}</div>
                  <div style={styles.buttonsContainer}>
                    <button
                      onClick={() => downloadQRCode(savedQRs[currentPage].name, savedQRs[currentPage].text)}
                      style={styles.downloadButton}
                    >
                      Descargar QR
                    </button>
                    <button
                      onClick={() => deleteQRCode(savedQRs[currentPage].id)}
                      style={styles.savedDeleteButton}
                    >
                      Eliminar QR
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div style={styles.paginationContainer}>
              <button onClick={prevPage} style={styles.paginationButton} disabled={currentPage === 0}>
                Anterior
              </button>
              <button onClick={nextPage} style={styles.paginationButton} disabled={currentPage === savedQRs.length - 1}>
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f4f7fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '80%',
    margin: '20px auto',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    width: '80%',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  qrContainer: {
    marginTop: '20px',
  },
  qrWrapper: {
    marginBottom: '30px',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  qrCode: {
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  savedQRsContainer: {
    marginTop: '40px',
  },
  savedHeading: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  savedQRsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  savedQRItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    wordWrap: 'break-word', // Permite que el texto salte a la siguiente línea
    overflowWrap: 'break-word', // Alternativa moderna para ajustar el texto
    whiteSpace: 'normal', // Asegura que las líneas se dividan automáticamente
    overflow: 'hidden', 
  },
  savedQRCode: {
    marginBottom: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  qrName: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
    fontWeigth: 'bold',
  },
  savedDeleteButton: {
    padding: '8px 16px',
    backgroundColor: '#F44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s',
  },
  paginationContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  paginationButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
};

export default QRCodeGenerator;
