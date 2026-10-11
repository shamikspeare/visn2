import React, { useEffect, useId, useRef, useState } from 'react';

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;

const cx = (...classes) => classes.filter(Boolean).join(' ');

const arc = (bend) => (
  (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend))
);

const measure = (width, height, tile, aspect, gap, bend) => {
  const h = Math.min(
    (tile / 100) * height,
    ((MAX_WIDTH / 100) * width) / aspect,
  );
  const radius = width * arc(bend);

  if (!(h > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  }

  const deg = (radians) => (radians * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const round = (number) => +number.toFixed(4);
  const sweep = round((columns * pitch) / 2);

  return {
    columns,
    sweep,
    unit: round(unit),
    limit: round(Math.min(sweep, limit)),
  };
};

const TiltedGridHero = ({
  images,
  speed = 4,
  tileHeight = 26,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 56,
  curve = 80,
  fade = 12,
  children,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef(null);
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const orbit = `tgh-o-${id}`;
  const tileClass = `tgh-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const [layout, setLayout] = useState(null);
  const [shown, setShown] = useState({});

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((previous) => (
        previous?.columns === next.columns
        && previous.sweep === next.sweep
        && previous.unit === next.unit
          ? previous
          : next
      ));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  useEffect(() => {
    images.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, [images]);

  const { columns, sweep, unit, limit } = (
    layout ?? measure(1200, 720, tileHeight, aspectRatio, gap, bend)
  );

  const sizeUnit = (number) => (
    `calc(${+number.toFixed(4)} * min(${tileHeight}cqh, ${+(
      MAX_WIDTH / aspectRatio
    ).toFixed(4)}cqw))`
  );

  const radiusValue = 100 * arc(bend);
  const radius = `${+radiusValue.toFixed(3)}cqw`;
  const turn = (degrees) => (
    `translateZ(${radius}) rotateY(${+degrees.toFixed(4)}deg) translateZ(-${radius})`
  );

  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const keyframes = (
    `@keyframes ${orbit}{`
    + `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}`
    + `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}`
    + `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}`
    + `@media(prefers-reduced-motion:reduce){.${tileClass}{animation-play-state:paused}}`
  );

  const share = aspectRatio / SLICES;
  const duration = columns * speed;
  const mask = `linear-gradient(90deg, transparent, #000 ${fade}%, #000 ${100 - fade}%, transparent)`;

  return (
    <div
      ref={ref}
      className={cx('relative overflow-hidden', className)}
      style={{ containerType: 'size', ...style }}
      {...props}
    >
      <style>{keyframes}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-500"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(radiusValue * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, tileIndex) => {
          const first = columns - 1 - tileIndex;
          const image = images[(shown[tileIndex] ?? first) % Math.max(images.length, 1)];

          return (
            <div
              key={tileIndex}
              className={cx(tileClass, 'absolute')}
              style={{
                left: `calc(50% - ${sizeUnit(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${sizeUnit(0.5)})`,
                width: sizeUnit(aspectRatio),
                height: sizeUnit(1),
                transformStyle: 'preserve-3d',
                animation: `${orbit} ${duration}s linear ${-tileIndex * speed}s infinite`,
              }}
              onAnimationIteration={(event) => {
                const lap = Math.round(event.elapsedTime / duration);
                setShown((previous) => {
                  const next = lap * columns + first;
                  return previous[tileIndex] === next
                    ? previous
                    : { ...previous, [tileIndex]: next };
                });
              }}
            >
              {Array.from({ length: SLICES }, (_, sliceIndex) => (
                <div
                  key={sliceIndex}
                  className={cx(
                    'absolute top-0 overflow-hidden bg-[#111111]',
                    sliceIndex === 0 && 'rounded-l-lg',
                    sliceIndex === SLICES - 1 && 'rounded-r-lg',
                  )}
                  style={{
                    left: sizeUnit((aspectRatio - share) / 2),
                    width: sliceIndex === SLICES - 1
                      ? sizeUnit(share)
                      : `calc(${sizeUnit(share)} + 1px)`,
                    height: sizeUnit(1),
                    transform: turn(
                      (aspectRatio / 2 - (sliceIndex + 0.5) * share) * unit,
                    ),
                  }}
                >
                  {image ? (
                    <img
                      src={image.src}
                      alt=""
                      draggable={false}
                      className="absolute top-0 max-w-none object-cover"
                      style={{
                        left: sizeUnit(-sliceIndex * share),
                        width: sizeUnit(aspectRatio),
                        height: sizeUnit(1),
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
};

export default TiltedGridHero;
