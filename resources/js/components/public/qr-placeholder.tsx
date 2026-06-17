import { cn } from '@/lib/utils';

/** A decorative faux-QR (deterministic pattern) for the payment mock-up. */
export function QrPlaceholder({ className }: { className?: string }) {
    const size = 21;
    const cells: boolean[] = [];
    let seed = 7;
    for (let i = 0; i < size * size; i++) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        cells.push((seed >> 16) % 2 === 0);
    }

    const isFinder = (r: number, c: number) =>
        (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);

    return (
        <div className={cn('rounded-xl bg-white p-3 shadow-inner', className)}>
            <svg viewBox={`0 0 ${size} ${size}`} className="size-full" shapeRendering="crispEdges" role="img" aria-label="Kode QR pembayaran QRIS">
                {cells.map((on, i) => {
                    const r = Math.floor(i / size);
                    const c = i % size;
                    if (isFinder(r, c) || !on) return null;
                    return <rect key={i} x={c} y={r} width={1} height={1} fill="#064E3B" />;
                })}
                {/* finder squares */}
                {[
                    [0, 0],
                    [0, size - 7],
                    [size - 7, 0],
                ].map(([y, x], k) => (
                    <g key={k} fill="#064E3B">
                        <rect x={x} y={y} width={7} height={7} />
                        <rect x={x + 1} y={y + 1} width={5} height={5} fill="#fff" />
                        <rect x={x + 2} y={y + 2} width={3} height={3} />
                    </g>
                ))}
            </svg>
        </div>
    );
}
