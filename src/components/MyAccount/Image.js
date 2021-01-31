import React, { useState } from 'react'
import app from "../firebaseConfig";
import 'firebase/storage';
import {Modal} from 'react-bootstrap'; 

export default function ModalImage(props) {
    const [ref, setRef] = useState(null);
    const [url, seturl] = useState(null);
    const storage = app.storage();
    const [Imagen, setImagen] = useState();
    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
    const uploadImage = async () => {
        try {
            const newRef = storage.ref('images').child(props.imgName); // nombre del archivo
            setRef(newRef);
            await newRef.put(Imagen);
            let urlImagen = await newRef.getDownloadURL()
            props.setphoto(urlImagen);
            props.onHide();
        } catch (error) {
            alert(error);
        }
    };
    return (
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Buscar imagenes
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input className="input" type="file" name="imagen" onChange={changeImagen} />
            
        </Modal.Body>
        <Modal.Footer>
            <button className="button is-success" type="submit" onClick={uploadImage} >Guardar</button>
            <button className="button is-success" type="submit" onClick={props.onHide}>Cerrar</button>
        </Modal.Footer>

    </Modal>
    )

}