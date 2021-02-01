import React, { useState } from 'react'
import { MapContainer  as Map, useMapEvents, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from 'leaflet'
import icon from '../Home/marker2.webp';
import {postRequest,getAllRequests} from '../services/request'
import {getAllUsers} from '../services/user'
import ModalSuccess from '../MyAccount/ModalSuccess';

export default function MapWorkers(props) {

    const [activeWorker, setActiveWorker] = useState(null);
    const [isOpenModalSuccess, setisOpenModalSuccess]=useState(false);
    const [message, setMessage]=useState("");
    const [isReload, setisReload]=useState(false);
    const [isLogin, setisLogin]=useState(false);

    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var name;
    var profession;
    var mail;
    var wId;
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
    function setModalSuccessShow(value){
        setisOpenModalSuccess(value);
        if(isReload){
          window.location.href="/requestsuot";
        }if(isLogin){
        window.location.href="/login";
        }
      }
    function currentDate(){
        var f=new Date();
        return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
    }

    const onE = (e) => {
        e.preventDefault();
        const querystring = require('querystring');
        let y=0;
        let x=0;
        let z=0;
        let isSameWorker=false; 
        let isSameUser=false; 
        let guId;                        
        let count=0; 
        let datos;
        getAllUsers()
            .then(data2 => {  
                datos=data2;
                if (props.isAuthenticated && props.user ){
                    if(z===0){ 
                                     
                        for (var clave2 of data2){
                            count++;
                            if (clave2.mail===props.user.attributes.email){
                                    guId=clave2.uId;                                                             
       
                                    getAllRequests()
                                    .then(data => {  
                                        for (var clave of data){
                                            if (clave.wId===wId){ 
                                                if (guId==clave.uId){
                                                    console.log("modificando")
                                                    isSameUser=true; 
                                                    isSameWorker=true;
                                                    if(isSameWorker && isSameUser){
                                                        if(x===0){
                                                            setisOpenModalSuccess(true);
                                                            setMessage("Ya ha realizado esta solicitud ");
                                                            x++
                                                            return;
                                                        }
                                                    }          
                                                }

                                            } 
                                        }
                                            console.log(count)
                                            console.log(data2.length)
                                            if(count==data2.length && x===0){
                                                postRequest(JSON.stringify(
                                                    {
                                                        uId: guId,
                                                        wId: wId,
                                                        wMail: mail,
                                                        wName: name,
                                                        wPhoto: foto,
                                                        wProfession: profession,
                                                        wTel: tel,
                                                        rPrice:"0"
                                                    }
                                                ))
                                                    .then(data => {
                                                        console.log("Successful Request Added");
                                                        setisReload(true);
                                                        setisOpenModalSuccess(true);
                                                        setMessage("Solicitud creada correctamente");
                                                    })
                                                    .catch(function (err) {
                                                        setisReload(false);
                                                        setisOpenModalSuccess(true);
                                                        setMessage("Error: "+err);
                                                    });
                                                    x++;
                                            }                                                                                                            
                
                                    })
                                    .then(data => console.log("Successful Found User") )
                                    .catch(error => console.log('error', error));
                                }                              
                        }                                                               
                        z++;                                     
                    }

                }else{
                    if(z===0){
                        setisLogin(true);
                        setisReload(false);
                        setisOpenModalSuccess(true);
                        setMessage("¡Primero Inicie sesión!");
                        z++;
                    }
                }
                
                
            }).then(data2 =>{})
            .catch(error => console.log('error', error));                               

    }

    return (
        <div>
        <ModalSuccess show={isOpenModalSuccess} onHide={() => setModalSuccessShow(false)}  message={message} />
        <Map center={[6.267417, -75.568389]} zoom={15} Popup={true} maxZoom={20}>
                
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {props.workers.map(element =>
                        <Marker
                            key={element.wId}
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
                                        <figure class="image is-4by3">{foto = activeWorker.photo}{wId = activeWorker.wId}
                                        <img src={foto} alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-48x48">
                                            <img src={foto} alt="Placeholder image"/>
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
                </div>
    )

}