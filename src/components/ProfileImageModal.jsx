import React, { useState } from 'react';
import '../styles/ProfileImageModal.css'; // Asegúrate de tener un archivo CSS para los estilos

const ProfileImageModal = ({ isOpen, onClose, onSave }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = () => {
    if (image) {
      onSave(image);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Cambiar Imagen de Perfil</h2>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default ProfileImageModal;