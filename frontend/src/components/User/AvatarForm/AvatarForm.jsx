import React from "react";
import { Button } from "semantic-ui-react";
import "./AvatarForm.scss";

export default function AvatarForm(props) {
  const { setShowModal } = props;

  return (
    <div className='avatar-form'>
      <Button>Subir foto</Button>
      <Button>Eliminar foto</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
