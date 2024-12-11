const QRInfo = () => {
  return (
    <div
      style={{
        margin: '30px',
        padding: '20px',
        backgroundColor: '#5e124b',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h3
        style={{
          color: '#fff',
          fontSize: '1.5rem',
          marginBottom: '10px',
          textAlign: 'center',
        }}
      >
        ¿Qué es un Código QR?
      </h3>
      <p
        style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#fff',
          marginBottom: '15px',
        }}
      >
        Un código QR (Quick Response) es un tipo de código de barras bidimensional
        que puede almacenar información como texto, URL, números, etc. Se utiliza
        comúnmente para almacenar información que puede ser leída rápidamente por
        dispositivos como teléfonos móviles o escáneres. 
      </p>
      <p
        style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#fff',
        }}
      >
        Puedes usar este generador para crear códigos QR personalizados para compartir
        enlaces, datos de contacto o cualquier otra información de manera rápida y
        eficiente.
      </p>
      <div
        style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        <i>¡Genera tu propio Código QR ahora!</i>
      </div>
    </div>
  );
};

export default QRInfo;
