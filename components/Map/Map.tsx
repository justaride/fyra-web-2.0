'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon missing in React-Leaflet
const fixLeafletIcon = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
};

interface MapProps {
    suppliers: any[];
}

export default function Map({ suppliers }: MapProps) {
    useEffect(() => {
        fixLeafletIcon();
    }, []);

    // Center of Nordics roughly (Sweden/Norway border area)
    const position: [number, number] = [59.5, 14.5];

    return (
        <div className="h-[500px] w-full rounded-xl overflow-hidden border shadow-sm z-0 relative">
            <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {suppliers.map((supplier) => (
                    supplier.mapLocations?.map((loc: any, idx: number) => (
                        <Marker key={`${supplier.id}-${idx}`} position={[loc.lat, loc.lng]}>
                            <Popup>
                                <div className="min-w-[200px]">
                                    <h3 className="font-bold text-sm text-slate-900">{supplier.name}</h3>
                                    <div className="text-xs text-slate-500 font-medium mb-2">{loc.name}</div>
                                    <p className="text-xs text-slate-600 mb-2">{loc.address}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-100">
                                            {supplier.hospitalityReadiness?.tier || 'Partner'}
                                        </span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))
                ))}
            </MapContainer>
        </div>
    );
}
