import { LAND, MAP_H, MAP_W, OFFICE_PINS } from '../content/worldmap'

// Map of our offices (Peru → Kazakhstan). `region` dims pins outside it; `active` is a city to highlight.
export default function OfficeMap({ region = null, active = null, onActive = () => {}, className = '' }) {
  const label = OFFICE_PINS.find(p => p.city === active)
  return (
    <div className={`office-map ${className}`}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label={`Mapa kancelarija${region ? ` – ${region}` : ''}`}>
        <path d={LAND} className="land" />
        {OFFICE_PINS.map(p => {
          const hq = p.city === 'Beograd'
          const dim = region && p.region !== region && !(hq && region === 'Evropa')
          const on = p.city === active
          return (
            <g key={p.city} className={`pin${hq ? ' hq' : ''}${dim ? ' dim' : ''}${on ? ' on' : ''}`} transform={`translate(${p.x} ${p.y})`}
              onMouseEnter={() => onActive(p.city)} onMouseLeave={() => onActive(null)}>
              <title>{`${p.city}, ${p.country}${hq ? ' – sedište' : ''}`}</title>
              <circle r="14" className="hit" />
              {hq && <circle r="11" className="ring" />}
              <circle r={on ? 8 : hq ? 7 : 5.5} className="dot" />
            </g>
          )
        })}
        {label && (
          <g className="pin-label" transform={`translate(${label.x} ${label.y - 18})`}>
            <text textAnchor={label.x > MAP_W - 120 ? 'end' : label.x < 120 ? 'start' : 'middle'}>{label.city}, {label.country}</text>
          </g>
        )}
      </svg>
    </div>
  )
}
