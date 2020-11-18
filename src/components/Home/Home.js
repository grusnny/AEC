import React, { useState } from 'react';
import "../Home/Home.css";
import { Container } from 'reactstrap';
import { MapContainer  as Map, useMapEvents, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from 'leaflet'
import icon from '../Home/marker2.webp';
import { Auth } from 'aws-amplify';
import {postWorker, getAllWorkers} from '../services/worker'
import {
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';



var name;
var profession;
var mail;
var wid;
var foto;
var tel;
var greenIcon = L.icon({
    iconUrl: icon,
    //shadowUrl: shadow,

    iconSize: [80, 80], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const onE = (e) => {
    e.preventDefault();
    const querystring = require('querystring');

    postWorker(querystring.stringify({
        uid: this.props.auth.user.username,
        wname: name,
        wprofession: profession,
        wmail: mail,
        wphoto: foto,
        wid: wid,
        wtel: tel
    }))
        .then(data => {
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}


function Home() {

    const [worker, setWorker] = React.useState([])
    const [activeWorker, setActiveWorker] = React.useState(null);
    const [btnDropright, setOpen] = useState(false);
    const toggle = () => setOpen(!btnDropright);
    const [position, setPosition] = useState(null)

    function LocationMap() { 
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })
        return position === null ? null : (
            <Marker position={position}>
              <Popup>Estas aquí</Popup>
            </Marker>
          )
    }

    React.useEffect(() => {
        const fetchData = async () => {
            getAllWorkers()
                .then(data => {
                    const info =JSON.stringify(data)
                    console.log("esta es la informacion: " + info);
                    let workers=[];                  
                    for (var clave of data){
                        console.log(clave.profession);
                        if (clave.profession=="Ing") {
                          console.log(clave);
                          workers.push(clave);
                        }
                    }
                    console.log(workers)
                    setWorker(workers.map(doc => ({ ...doc, id:doc.uId })))
                    
                })
                .then(data => console.log(data) )
                .catch(error => console.log('error', error));
        }
        fetchData()
    }, [])

    return (
        <div className="App">
            <Container className='text-left'>
                <ButtonDropdown direction="right" isOpen={btnDropright} toggle={toggle}>
                    <DropdownToggle caret>
                        Categorias
      </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Selecciona una nueva categoria</DropdownItem>
                        <DropdownItem> <a class="nav-link" href="/albanil">Albañiles</a></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem> <a class="nav-link" href="/Home">Electricistas</a></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem> <a class="nav-link" href="/plomero">Plomeros</a></DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                    <Map center={[6.267417, -75.568389]} zoom={15} Popup={true}>
                
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {worker.map(element =>
                        <Marker
                            key={element.id}
                            icon={greenIcon}
                            position={[element.latitude, element.length]}
                            onClick={() => {
                                setActiveWorker(element);
                            }}
                        />
                    )}
                    {activeWorker && (
                        <Popup
                            position={[
                                activeWorker.latitude,
                                activeWorker.length
                            ]}
                            onClose={() => {
                                setActiveWorker(null);
                            }}
                        >
                            <div>
                                <Card style={{ width: '12rem' }}>
                                    <CardImg top width="5%" src={foto = activeWorker.photo} />
                                    <CardBody>
                                        <CardTitle>Nombre: {name = activeWorker.name}</CardTitle>
                                        <CardSubtitle>Correo: {mail = activeWorker.mail}</CardSubtitle>
                                        <CardText>Profesión: {profession = activeWorker.profession}</CardText>
                                        <CardSubtitle>Telefono: {tel = activeWorker.telephone}</CardSubtitle>
                                        <CardSubtitle>{wid = activeWorker.uId}</CardSubtitle>
                                        <button type="button" className="btn btn-outline-primary" onClick={onE} >Contactar</button>
                                    </CardBody>
                                </Card>
                            </div>
                        </Popup>
                    )}
                    <LocationMap/>
                </Map>
            </Container>
        </div>
    );
}

export default Home; 