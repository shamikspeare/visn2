import React, { useEffect, useId, useRef, useState } from 'react';

const SLICES = 16;
const CAMERA = 1.6;
const DEFAULT_MAX_WIDTH = 55;

const cx = (...classes) => classes.filter(Boolean).join(' ');

const arc = (bend, surface) => {
  const depth = surface === 'convex'
    ? CAMERA + 1 - Math.cos(bend)
    : CAMERA - 1 + Math.cos(bend);

  return depth / (2 * CAMERA * Math.sin(bend));
};

const measure = (
  width,
  height,
  tile,
  aspect,
  gap,
  bend,
  orientation,
  surface,
  maxTileWidth,
  radiusScale,
) => {
  const h = Math.min(
    (tile / 100) * height,
    ((maxTileWidth / 100) * width) / aspect,
  );
  const travelSpan = orientation === 'vertical' ? height : width;
  const travelSize = orientation === 'vertical' ? 1 : aspect;
  const radius = travelSpan * arc(bend, surface) * radiusScale;

  if (!(h > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  }

  const deg = (radians) => (radians * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (travelSize + gap / 100) * unit;
  const limit = deg(bend) + (travelSize * unit) / 2;
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
  orientation = 'horizontal',
  surface = 'concave',
  maxTileWidth = DEFAULT_MAX_WIDTH,
  radiusScale = 1,
  edgeBlur = 0,
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
      const next = measure(
        width,
        height,
        tileHeight,
        aspectRatio,
        gap,
        bend,
        orientation,
        surface,
        maxTileWidth,
        radiusScale,
      );
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
  }, [tileHeight, aspectRatio, gap, bend, orientation, surface, maxTileWidth, radiusScale]);

  useEffect(() => {
    images.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, [images]);

  const { columns, sweep, unit, limit } = (
    layout ?? measure(
      1200,
      720,
      tileHeight,
      aspectRatio,
      gap,
      bend,
      orientation,
      surface,
      maxTileWidth,
      radiusScale,
    )
  );

  const sizeUnit = (number) => (
    `calc(${+number.toFixed(4)} * min(${tileHeight}cqh, ${+(
      maxTileWidth / aspectRatio
    ).toFixed(4)}cqw))`
  );

  const radiusValue = 100 * arc(bend, surface) * radiusScale;
  const radiusUnit = orientation === 'vertical' ? 'cqh' : 'cqw';
  const radius = `${+radiusValue.toFixed(3)}${radiusUnit}`;
  const rotation = orientation === 'vertical' ? 'rotateX' : 'rotateY';
  const turn = (degrees) => {
    const reverseRotation = (
      (orientation === 'horizontal' && surface === 'convex')
      || (orientation === 'vertical' && surface === 'concave')
    );
    const orientedDegrees = reverseRotation
      ? -degrees
      : degrees;
    const rotationValue = +orientedDegrees.toFixed(4);

    return surface === 'convex'
      ? `translateZ(-${radius}) ${rotation}(${rotationValue}deg) translateZ(${radius})`
      : `translateZ(${radius}) ${rotation}(${rotationValue}deg) translateZ(-${radius})`
  };

  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const keyframes = (
    `@keyframes ${orbit}{`
    + `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}`
    + `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}`
    + `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}`
    + `@media(prefers-reduced-motion:reduce){.${tileClass}{animation-play-state:paused}}`
  );

  const share = (orientation === 'vertical' ? 1 : aspectRatio) / SLICES;
  const duration = columns * speed;
  const maskDirection = orientation === 'vertical' ? '180deg' : '90deg';
  const mask = `linear-gradient(${maskDirection}, transparent, #000 ${fade}%, #000 ${100 - fade}%, transparent)`;

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
          perspective: `${+(radiusValue * CAMERA).toFixed(3)}${radiusUnit}`,
          perspectiveOrigin: orientation === 'vertical' ? `${axis}% 50%` : `50% ${axis}%`,
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
                left: orientation === 'vertical'
                  ? `calc(${axis}% - ${sizeUnit(aspectRatio / 2)})`
                  : `calc(50% - ${sizeUnit(aspectRatio / 2)})`,
                top: orientation === 'vertical'
                  ? `calc(50% - ${sizeUnit(0.5)})`
                  : `calc(${axis}% - ${sizeUnit(0.5)})`,
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
                    'absolute overflow-hidden',
                    orientation === 'horizontal' && 'bg-[#111111]',
                    orientation === 'vertical' ? 'left-0' : 'top-0',
                    orientation === 'horizontal' && sliceIndex === 0 && 'rounded-l-lg',
                    orientation === 'horizontal' && sliceIndex === SLICES - 1 && 'rounded-r-lg',
                  )}
                  style={orientation === 'vertical'
                    ? {
                      top: `calc(${sizeUnit((1 - share) / 2)} - 0.5px)`,
                      width: sizeUnit(aspectRatio),
                      height: `calc(${sizeUnit(share)} + 1px)`,
                      transform: turn(
                        (0.5 - (sliceIndex + 0.5) * share) * unit,
                      ),
                    }
                    : {
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
                      className="absolute max-w-none object-cover"
                      style={orientation === 'vertical'
                        ? {
                          left: 0,
                          top: `calc(${sizeUnit(-sliceIndex * share)} + 0.5px)`,
                          width: sizeUnit(aspectRatio),
                          height: sizeUnit(1),
                          objectPosition: image.objectPosition,
                        }
                        : {
                          left: sizeUnit(-sliceIndex * share),
                          top: 0,
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

      {edgeBlur > 0 && orientation === 'vertical' ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-[3]"
            style={{
              height: `${fade}%`,
              background: 'rgba(10, 10, 10, 0.01)',
              backdropFilter: `blur(${edgeBlur}px)`,
              WebkitBackdropFilter: `blur(${edgeBlur}px)`,
              maskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
            style={{
              height: `${fade}%`,
              background: 'rgba(10, 10, 10, 0.01)',
              backdropFilter: `blur(${edgeBlur}px)`,
              WebkitBackdropFilter: `blur(${edgeBlur}px)`,
              maskImage: 'linear-gradient(to top, #000 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 100%)',
            }}
          />
        </>
      ) : null}

      {children}
    </div>
  );
};

export default TiltedGridHero;
