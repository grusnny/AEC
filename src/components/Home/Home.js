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


var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
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

    const [worker, setWorker] = useState([])
    const [activeWorker, setActiveWorker] = useState(null);
    const [btnDropright, setOpen] = useState(false);
    const toggle = () => setOpen(!btnDropright);


function LocationMap() { 
    const [position, setPosition] = useState(null)
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

    function currentDate(){
        var f=new Date();
        return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
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
                            eventHandlers={{
                                click: () => {
                                    setActiveWorker(element);
                                },
                              }}

                        />
                    )}
                    { activeWorker === null ? null : (
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
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">{foto = activeWorker.photo}
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-4">{name = activeWorker.name}</p>
                                            <p class="subtitle is-6">{mail = activeWorker.mail}</p>

                                        </div>
                                        </div>

                                        <div class="content">
                                        <strong>Profesión: {profession = activeWorker.profession}</strong>
                                        <br/>
                                        <strong>Telefono: {tel = activeWorker.telephone}</strong>
                                        <br/>
                                        <strong><time datetime="2016-1-1">{currentDate()}</time></strong>
                                        <br/>
                                        <br/>
                                        <div align="center">
                                        <button className="button is-primary is-rounded "  onClick={onE}>
                                                <strong>Contactar</strong>
                                        </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>                            
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