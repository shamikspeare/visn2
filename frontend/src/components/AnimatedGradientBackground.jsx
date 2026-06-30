import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

/**
 * AnimatedGradientBackground
 *
 * Renders a customizable animated radial gradient background with a subtle breathing effect.
 * Uses framer-motion for an entrance animation and raw CSS gradients for the dynamic background.
 *
 * Props:
 *  - startingGap       (number)   Initial radial gradient width. Default 125.
 *  - Breathing          (bool)     Enable breathing animation. Default false.
 *  - gradientColors     (string[]) Colors for the radial gradient.
 *  - gradientStops      (number[]) Percentage stops for each color.
 *  - animationSpeed     (number)   Speed of breathing. Default 0.02.
 *  - breathingRange     (number)   Max range of breathing in %. Default 5.
 *  - containerStyle     (object)   Extra inline styles.
 *  - containerClassName (string)   Extra class names.
 *  - topOffset          (number)   Extra top offset for gradient origin. Default 0.
 *  - gradientOrigin     (string)   CSS position for gradient center. Default "50% 20%".
 */
const AnimatedGradientBackground = ({
  startingGap = 125,
  Breathing = false,
  gradientColors = [
    "#0A0A0A",
    "#2979FF",
    "#FF80AB",
    "#FF6D00",
    "#FFD600",
    "#00E676",
    "#3D5AFE",
  ],
  gradientStops = [35, 50, 60, 70, 80, 90, 100],
  animationSpeed = 0.02,
  breathingRange = 5,
  containerStyle = {},
  topOffset = 0,
  containerClassName = "",
  gradientOrigin = "50% 20%",
}) => {
  // Validation: Ensure gradientStops and gradientColors lengths match
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `GradientColors and GradientStops must have the same length. ` +
        `Received gradientColors length: ${gradientColors.length}, ` +
        `gradientStops length: ${gradientStops.length}`
    );
  }

  const containerRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    let width = startingGap;
    let directionWidth = 1;

    const animateGradient = () => {
      if (width >= startingGap + breathingRange) directionWidth = -1;
      if (width <= startingGap - breathingRange) directionWidth = 1;

      if (!Breathing) directionWidth = 0;
      width += directionWidth * animationSpeed;

      const gradientStopsString = gradientStops
        .map((stop, index) => `${gradientColors[index]} ${stop}%`)
        .join(", ");

      const gradient = `radial-gradient(${width}% ${
        width + topOffset
      }% at ${gradientOrigin}, ${gradientStopsString})`;

      if (containerRef.current) {
        containerRef.current.style.background = gradient;
      }

      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);

    return () => cancelAnimationFrame(animationFrame);
  }, [
    startingGap,
    Breathing,
    gradientColors,
    gradientStops,
    animationSpeed,
    breathingRange,
    topOffset,
    gradientOrigin,
  ]);

  return (
    <motion.div
      key="animated-gradient-background"
      initial={{
        opacity: 0,
        scale: 1.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        className="absolute inset-0 transition-transform"
      />
    </motion.div>
  );
};

export default AnimatedGradientBackground;
