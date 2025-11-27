'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Building2, MapPin, ExternalLink, Phone, Mail, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Custom marker icons based on tier
const createCustomIcon = (tier: string, isHovered: boolean = false) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
        'Tier 1': { bg: '#0d9488', border: '#0f766e', text: '#ffffff' },  // Teal - Proven
        'Tier 2': { bg: '#3b82f6', border: '#2563eb', text: '#ffffff' },  // Blue - Potential
        'Tier 3': { bg: '#f59e0b', border: '#d97706', text: '#ffffff' },  // Amber - Regional
        'default': { bg: '#64748b', border: '#475569', text: '#ffffff' }, // Slate - Other
    };

    const color = colors[tier] || colors['default'];
    const scale = isHovered ? 1.2 : 1;
    const size = 36 * scale;
    const anchorSize = 18 * scale;

    const svg = `
        <svg width="${size}" height="${size + 12}" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
            </defs>
            <g filter="url(#shadow)">
                <path d="M18 0C8.059 0 0 8.059 0 18c0 12.627 16.5 28.5 17.25 29.25a1.125 1.125 0 001.5 0C19.5 46.5 36 30.627 36 18c0-9.941-8.059-18-18-18z" fill="${color.bg}"/>
                <path d="M18 0C8.059 0 0 8.059 0 18c0 12.627 16.5 28.5 17.25 29.25a1.125 1.125 0 001.5 0C19.5 46.5 36 30.627 36 18c0-9.941-8.059-18-18-18z" fill="none" stroke="${color.border}" stroke-width="2"/>
                <circle cx="18" cy="18" r="8" fill="${color.text}" fill-opacity="0.9"/>
                <circle cx="18" cy="18" r="4" fill="${color.bg}"/>
            </g>
        </svg>
    `;

    return L.divIcon({
        html: svg,
        className: 'custom-marker',
        iconSize: [size, size + 12],
        iconAnchor: [anchorSize, size + 12],
        popupAnchor: [0, -size],
    });
};

// Animated markers component
function AnimatedMarker({ supplier, location, idx, onHover }: {
    supplier: any;
    location: any;
    idx: number;
    onHover: (id: string | null) => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const tier = supplier.hospitalityReadiness?.tier || 'default';

    return (
        <Marker
            key={`${supplier.id}-${idx}`}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(tier, isHovered)}
            eventHandlers={{
                mouseover: () => {
                    setIsHovered(true);
                    onHover(supplier.id);
                },
                mouseout: () => {
                    setIsHovered(false);
                    onHover(null);
                },
            }}
        >
            <Popup className="custom-popup" maxWidth={320} minWidth={280}>
                <div className="p-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                            <h3 className="font-bold text-base text-slate-900 leading-tight">{supplier.name}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{location.name}</p>
                        </div>
                        <span className={`
                            inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap
                            ${tier === 'Tier 1' ? 'bg-teal-100 text-teal-800 border border-teal-200' : ''}
                            ${tier === 'Tier 2' ? 'bg-blue-100 text-blue-800 border border-blue-200' : ''}
                            ${tier === 'Tier 3' ? 'bg-amber-100 text-amber-800 border border-amber-200' : ''}
                            ${!tier || tier === 'default' ? 'bg-slate-100 text-slate-700 border border-slate-200' : ''}
                        `}>
                            {tier || 'Partner'}
                        </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 text-xs text-slate-600 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <span>{location.address}</span>
                    </div>

                    {/* Quick stats */}
                    {supplier.capabilities?.volume && (
                        <div className="bg-slate-50 rounded-lg p-2 mb-3 text-xs text-slate-600">
                            <span className="line-clamp-2">{supplier.capabilities.volume.split('.')[0]}</span>
                        </div>
                    )}

                    {/* Contact info */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {supplier.contact?.website && (
                            <a
                                href={supplier.contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] text-teal-600 hover:text-teal-800"
                            >
                                <Globe className="w-3 h-3" />
                                Website
                            </a>
                        )}
                        {supplier.contact?.email && (
                            <a
                                href={`mailto:${supplier.contact.email.split(',')[0]}`}
                                className="inline-flex items-center gap-1 text-[10px] text-teal-600 hover:text-teal-800"
                            >
                                <Mail className="w-3 h-3" />
                                Email
                            </a>
                        )}
                        {supplier.contact?.phone && (
                            <a
                                href={`tel:${supplier.contact.phone}`}
                                className="inline-flex items-center gap-1 text-[10px] text-teal-600 hover:text-teal-800"
                            >
                                <Phone className="w-3 h-3" />
                                Call
                            </a>
                        )}
                    </div>

                    {/* CTA */}
                    <Link
                        href={`/suppliers/${supplier.id}`}
                        className="flex items-center justify-center gap-1 w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors"
                    >
                        View Full Profile
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </Popup>
        </Marker>
    );
}

// Legend component
function MapLegend() {
    const tiers = [
        { name: 'Tier 1', label: 'Proven', color: '#0d9488', description: 'Hospitality experience verified' },
        { name: 'Tier 2', label: 'Potential', color: '#3b82f6', description: 'Strong capabilities' },
        { name: 'Tier 3', label: 'Regional', color: '#f59e0b', description: 'Local specialist' },
    ];

    return (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-3">
            <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Supplier Tiers</h4>
            <div className="space-y-1.5">
                {tiers.map((tier) => (
                    <div key={tier.name} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: tier.color }}
                        />
                        <span className="text-xs font-medium text-slate-700">{tier.label}</span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">- {tier.description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Stats overlay
function MapStats({ suppliers }: { suppliers: any[] }) {
    const tier1Count = suppliers.filter(s => s.hospitalityReadiness?.tier === 'Tier 1').length;
    const locationCount = suppliers.reduce((acc, s) => acc + (s.mapLocations?.length || 0), 0);

    return (
        <div className="absolute top-4 right-4 z-[1000] flex gap-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 px-3 py-2">
                <div className="text-lg font-bold text-slate-900">{suppliers.length}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Suppliers</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 px-3 py-2">
                <div className="text-lg font-bold text-teal-600">{locationCount}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Locations</div>
            </div>
        </div>
    );
}

interface MapProps {
    suppliers: any[];
}

export default function Map({ suppliers }: MapProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger load animation
        setIsLoaded(true);
    }, []);

    // Center of Nordics (Sweden/Norway border area)
    const position: [number, number] = [60.5, 15];

    return (
        <div className={`
            relative h-[600px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl z-0
            transition-all duration-700 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
            {/* Map container */}
            <MapContainer
                center={position}
                zoom={5}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                {/* Dark Nordic Theme */}
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Markers */}
                {suppliers.map((supplier) => (
                    supplier.mapLocations?.map((loc: any, idx: number) => (
                        <AnimatedMarker
                            key={`${supplier.id}-${idx}`}
                            supplier={supplier}
                            location={loc}
                            idx={idx}
                            onHover={setHoveredId}
                        />
                    ))
                ))}
            </MapContainer>

            {/* Legend */}
            <MapLegend />

            {/* Stats */}
            <MapStats suppliers={suppliers} />

            {/* Gradient overlay at bottom for fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
        </div>
    );
}
