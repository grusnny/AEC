import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';



export const CardProducto = ({ producto }) => {

    const [nombre, setWName] = React.useState(producto.nombre)
    const [descripción, setWMail] = React.useState(producto.descripción)
    const [precio, setWTel] = React.useState(producto.precio)
    const [precio_descuento, setfechaPet] = React.useState(producto.precio_descuento)
    const [urlimg, setState] = React.useState(producto.urlimg)

    return (
        <>
            <div>
                <Card style={{ width: '18rem' }}>
                    <CardImg top width="100%" src={urlimg} />
                    <CardBody>
                        <CardTitle>Nombre: {nombre}</CardTitle>
                        <CardSubtitle>Correo: {descripción}</CardSubtitle>
                        <CardSubtitle>Telefono: {precio}</CardSubtitle>
                        <CardSubtitle>Profesión: {precio_descuento}</CardSubtitle>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}