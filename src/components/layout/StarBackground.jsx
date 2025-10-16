  import { useEffect, useRef } from "react";

  const StarBackground = ({
    speedFactor = 0.05,
    starColor = [255, 255, 255],
    starCount = 3000,
  }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      let w = window.innerWidth;
      let h = window.innerHeight;

      const setCanvasSize = () => {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
      };
      setCanvasSize();

      const makeStars = (count) =>
        Array.from({ length: count }, () => ({
          x: Math.random() * 1600 - 800,
          y: Math.random() * 900 - 450,
          z: Math.random() * 1000,
        }));

      let stars = makeStars(starCount);

      const clear = () => ctx.clearRect(0, 0, w, h);

      const putPixel = (x, y, brightness) => {
        ctx.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${brightness})`;
        ctx.fillRect(x, y, 1, 1);
      };

      const moveStars = (distance) => {
        for (const s of stars) {
          s.z -= distance;
          if (s.z <= 1) s.z += 1000;
        }
      };

      let prevTime;
      const tick = (time) => {
        if (!prevTime) prevTime = time;
        const elapsed = time - prevTime;
        prevTime = time;

        moveStars(elapsed * speedFactor);
        clear();

        const cx = w / 2;
        const cy = h / 2;

        for (const s of stars) {
          const x = cx + s.x / (s.z * 0.001);
          const y = cy + s.y / (s.z * 0.001);
          if (x < 0 || x >= w || y < 0 || y >= h) continue;

          const d = s.z / 1000.0;
          const b = 1 - d * d;
          putPixel(x, y, b);
        }

        requestAnimationFrame(tick);
      };

      const handleResize = () => setCanvasSize();
      window.addEventListener("resize", handleResize);
      requestAnimationFrame(tick);

      return () => window.removeEventListener("resize", handleResize);
    }, [speedFactor, starColor, starCount]);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: "#000011",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
    );
  };

  export default StarBackground;
