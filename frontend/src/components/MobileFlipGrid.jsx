import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const INITIAL_DELAYS = [1.6, 0.25, 2.4, 0.9, 3.2, 1.45, 2.25, 1.6, 2.75];
const FIRST_HOLDS = [1.55, 2.15, 1.65, 1.85, 2.3, 1.75, 2, 1.6, 1.7];
const SECOND_HOLDS = [1.5, 1.75, 2.1, 1.6, 1.55, 2.25, 1.65, 1.9, 1.5];
const FLIP_DURATION = 1.1;
const HALF_FLIP_DURATION = FLIP_DURATION / 2;
const WHITE_WASH_OPACITY = 0.7;

const MobileFlipGrid = ({ images }) => {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context;

    const createAnimations = () => {
      context?.revert();
      context = gsap.context(() => {
        const cards = gsap.utils.toArray('[data-flip-card]', gridRef.current);
        const allWashes = gsap.utils.toArray('[data-flip-wash]', gridRef.current);

        if (motionPreference.matches) {
          gsap.set(cards, { rotationY: 0 });
          gsap.set(allWashes, { opacity: 0 });
          return;
        }

        cards.forEach((card, index) => {
          const washes = gsap.utils.toArray('[data-flip-wash]', card);

          gsap.set(card, {
            rotationY: 0,
            force3D: true,
            transformOrigin: '50% 50%',
          });
          gsap.set(washes, { opacity: 0 });

          gsap.timeline({
            delay: INITIAL_DELAYS[index],
            repeat: -1,
          })
            .addLabel('firstFlip')
            .to(card, {
              rotationY: 180,
              duration: FLIP_DURATION,
              ease: 'power2.inOut',
            }, 'firstFlip')
            .to(washes, {
              opacity: WHITE_WASH_OPACITY,
              duration: HALF_FLIP_DURATION,
              ease: 'sine.in',
            }, 'firstFlip')
            .to(washes, {
              opacity: 0,
              duration: HALF_FLIP_DURATION,
              ease: 'sine.out',
            }, `firstFlip+=${HALF_FLIP_DURATION}`)
            .to({}, { duration: FIRST_HOLDS[index] })
            .addLabel('secondFlip')
            .to(card, {
              rotationY: 360,
              duration: FLIP_DURATION,
              ease: 'power2.inOut',
            }, 'secondFlip')
            .to(washes, {
              opacity: WHITE_WASH_OPACITY,
              duration: HALF_FLIP_DURATION,
              ease: 'sine.in',
            }, 'secondFlip')
            .to(washes, {
              opacity: 0,
              duration: HALF_FLIP_DURATION,
              ease: 'sine.out',
            }, `secondFlip+=${HALF_FLIP_DURATION}`)
            .to({}, { duration: SECOND_HOLDS[index] });
        });
      }, gridRef);
    };

    createAnimations();
    motionPreference.addEventListener('change', createAnimations);

    return () => {
      motionPreference.removeEventListener('change', createAnimations);
      context?.revert();
    };
  }, [images.length]);

  return (
    <ul
      ref={gridRef}
      aria-label="Selected client work"
      className="grid w-[min(calc(100vw-40px),360px)] grid-cols-2 gap-2"
    >
      {images.map((image) => (
        <li
          key={image.src}
          className="relative aspect-[3/2] [perspective:900px]"
        >
          <div
            data-flip-card
            className="relative h-full w-full transform-gpu [transform-style:preserve-3d] will-change-transform"
            style={{ transform: 'rotateY(0deg)' }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-none bg-white"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: image.objectPosition }}
              />
              <div
                data-flip-wash
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-white opacity-0"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden rounded-none bg-white"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <img
                src={image.src}
                alt=""
                draggable={false}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: image.objectPosition }}
              />
              <div
                data-flip-wash
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-white opacity-0"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MobileFlipGrid;
