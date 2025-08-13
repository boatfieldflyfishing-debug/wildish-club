'use client';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Place = { id: string; name: string; category: string; latitude: number; longitude: number };
export default function PlacesMap({ places }: { places: Place[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: ref.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-1.5, 54.0],
      zoom: 5
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current; if (!map) return;
    (map as any)._markers?.forEach((m: mapboxgl.Marker) => m.remove());
    (map as any)._markers = [];
    places.forEach((p) => {
      const el = document.createElement('div');
      el.className = 'rounded-full px-2 py-1 text-xs bg-white border shadow';
      el.textContent = p.category;
      const marker = new mapboxgl.Marker(el)
        .setLngLat([p.longitude, p.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${p.name}</strong>`))
        .addTo(map);
      (map as any)._markers.push(marker);
    });
  }, [places]);

  return <div ref={ref} className="w-full h-96 rounded-2xl border" />;
}
