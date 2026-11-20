import { useEffect, useState } from "react";
import { APIProvider, AdvancedMarker, APILoadingStatus, InfoWindow, Map, useApiLoadingStatus, useMap } from "@vis.gl/react-google-maps";
import type { ProviderSummary } from "@workspace/api-client-react";
import { Link } from "wouter";

// Approximate service-area centres, not street addresses for the demo businesses.
const centres: Record<string, { lat: number; lng: number }> = {
  "Indiranagar, Bengaluru": { lat: 12.9784, lng: 77.6408 },
  "Koramangala, Bengaluru": { lat: 12.9352, lng: 77.6245 },
  "Jayanagar, Bengaluru": { lat: 12.9250, lng: 77.5938 },
  "HSR Layout, Bengaluru": { lat: 12.9116, lng: 77.6389 },
  "Whitefield, Bengaluru": { lat: 12.9698, lng: 77.7500 },
};
const mapsLink = (city: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city}, India`)}`;

function Pins({ providers }: { providers: ProviderSummary[] }) {
  const map = useMap();
  const [selected, setSelected] = useState<number | null>(null);
  const active = providers.find(p => p.id === selected);
  useEffect(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    providers.forEach(p => bounds.extend(centres[p.city]));
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      map.setCenter(bounds.getCenter());
      map.setZoom(14);
    } else {
      map.fitBounds(bounds, 48);
    }
  }, [map, providers]);
  return <>
    {providers.map(p => <AdvancedMarker key={p.id} position={centres[p.city]} title={`${p.businessName} — ${p.city}`} onClick={() => setSelected(p.id)} />)}
    {active && <InfoWindow position={centres[active.city]} onCloseClick={() => setSelected(null)}>
      <div className="space-y-1 text-slate-900">
        <strong>{active.businessName}</strong><p>{active.city}</p><p className="capitalize">{active.serviceTypes.join(", ")}</p>
        <Link className="block underline" href={`/providers/${active.id}`}>View provider</Link>
        <a className="underline" href={mapsLink(active.city)} target="_blank" rel="noreferrer">Open locality in Google Maps</a>
      </div>
    </InfoWindow>}
  </>;
}

function MapCanvas({ providers }: { providers: ProviderSummary[] }) {
  const status = useApiLoadingStatus();
  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) return <p role="status">Google Maps could not load. Use the locality links below.</p>;
  return <Map className="h-96 w-full" mapId="DEMO_MAP_ID" defaultCenter={{lat: 12.96, lng: 77.63}} defaultZoom={11}>
    <Pins providers={providers} />
  </Map>;
}

export function ProviderMap({ providers }: { providers: ProviderSummary[] }) {
  const mapped = providers.filter(p => Object.hasOwn(centres, p.city));
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return <section aria-label="Bengaluru provider map" className="space-y-3 rounded-xl border bg-card p-4">
    <h2 className="text-xl font-semibold">Bengaluru service areas</h2>
    <p className="text-sm text-muted-foreground">Pins show approximate neighbourhood centres, not business addresses.</p>
    {mapped.length > 0 && (key ? <APIProvider apiKey={key}><MapCanvas providers={mapped} /></APIProvider> : <p role="status">The interactive map isn’t configured. Explore each locality in Google Maps below.</p>)}
    {mapped.length < providers.length && <p>{providers.length - mapped.length} matching provider(s) have no mapped service area.</p>}
    <ul className="grid gap-2 text-sm sm:grid-cols-2">{mapped.map(p => <li key={p.id}><a className="underline" href={mapsLink(p.city)} target="_blank" rel="noreferrer">{p.businessName} · {p.city}</a></li>)}</ul>
    <a className="inline-block text-sm underline" href={mapsLink("Bengaluru")} target="_blank" rel="noreferrer">Open Bengaluru in Google Maps ↗</a>
  </section>;
}
