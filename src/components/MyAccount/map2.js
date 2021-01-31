import React, { useState,useRef,useMemo,useCallback } from 'react';
import { MapContainer as Map,useMapEvents,TileLayer, Marker, Popup } from 'react-leaflet';
import './map2.css';

const styles = {
    wrapper: { 
      height: '100%', 
      width: '100%', 
      margin: '0 auto', 
      display: 'flex', 

    },
    map: {
      flex: 1
    } 
  };

  const center = {
    lat: 51.505,
    lng: -0.09,
  }
function MapExample (){

    const [position, setPosition] = useState(center)
    
    function DraggableMarker() {
        const [draggable, setDraggable] = useState(false)
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
          () => ({
            dragend() {
              const marker = markerRef.current
              if (marker != null) {
                setPosition(marker.getLatLng())
                const { lat, lng } = marker.getLatLng();
                window.localStorage.setItem("userLatDoc", lat);
                window.localStorage.setItem("userLngDoc", lng);
              }
            },
          }),
          [],
        )
        const toggleDraggable = useCallback(() => {
          setDraggable((d) => !d)
        }, [])
      
        return (
          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                  ? 'El marcador se puede mover'
                  : 'Clic aquí para mover el marcador'}
              </span>
            </Popup>
          </Marker>
        )
      }

      function LocationMarker() {
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
              if(position==center){
                setPosition(e.latlng)       
                map.flyTo(e.latlng, map.getZoom())
                const { lat, lng } = e.latlng;
                window.localStorage.setItem("userLatDoc", lat);
                window.localStorage.setItem("userLngDoc", lng);
              }

          },
        })
      
        return (
        <div></div>
        )
      }
        return (
        <div id="content"  style={styles.wrapper} >
                <Map    
                        style={styles.map}
                        center={center}
                        zoom={16}
                        maxZoom={20}
                        attributionControl={true}
                        zoomControl={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                        Popup={true}>
                    <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <LocationMarker/>
                    <DraggableMarker/>
                </Map>
        </div>
        )
}
export default MapExample;