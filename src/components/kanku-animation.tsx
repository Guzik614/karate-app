// Animowany kanku – symbol Kyokushin: pierścień rysuje się, potem pojawiają się
// czubki palców (góra, dół) i nadgarstki (boki), a całość delikatnie pulsuje.
export function KankuAnimation({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`kanku ${className}`} aria-hidden>
      <circle className="kanku-orbit" cx={100} cy={100} r={88} />
      <circle className="kanku-wave" cx={100} cy={100} r={62} />
      <g className="kanku-glow">
        <circle className="kanku-ring" cx={100} cy={100} r={62} pathLength={1} />
        <circle className="kanku-ring kanku-inner" cx={100} cy={100} r={24} pathLength={1} />
        <polygon className="kanku-part kanku-part-1" points="89,42 100,8 111,42" />
        <polygon className="kanku-part kanku-part-1" points="89,158 100,192 111,158" />
        <rect className="kanku-part kanku-part-2" x={30} y={86} width={16} height={28} rx={4} />
        <rect className="kanku-part kanku-part-2" x={154} y={86} width={16} height={28} rx={4} />
      </g>
    </svg>
  );
}
