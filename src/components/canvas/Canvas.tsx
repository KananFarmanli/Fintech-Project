import  { useRef, useEffect } from "react";

class Particle {
  constructor(
    public x: number,
    public y: number,
    private directionX: number,
    private directionY: number,
    private size: number,
    private color: string,
    private ctx: CanvasRenderingContext2D,
    private canvasWidth: number,
    private canvasHeight: number
  ) {
    this.directionX *= 0.05;
    this.directionY *= 0.05;
  }

  draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(): void {
    if (this.x > this.canvasWidth || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > this.canvasHeight || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

export default function Canvas({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesArrayRef = useRef<Particle[]>([]);
  const requestFrameRef = useRef<number | null>(null);
  const strokeWidth = useRef(1);
  const connectionDistance = useRef<number | null>(null);

  function init() {
    const newParticlesArray = [];
    const { maxSize, numberOfParticles } = calculateParticleSettings();
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * maxSize + 1;
      const x = Math.random() * (width - size * 2) + size;
      const y = Math.random() * (height - size * 2) + size;
      const directionX = Math.random() * 5 - 2.5;
      const directionY = Math.random() * 5 - 2.5;
      const color = "white";
      newParticlesArray.push(
        new Particle(
          x,
          y,
          directionX,
          directionY,
          size,
          color,
          ctxRef.current!,
          width,
          height
        )
      );
    }
    particlesArrayRef.current = newParticlesArray;
    if (requestFrameRef.current) cancelAnimationFrame(requestFrameRef.current);
    requestFrameRef.current = requestAnimationFrame(animate);
  }

  const animate = () => {
    if (ctxRef.current) {
      ctxRef.current.clearRect(0, 0, width, height);
      particlesArrayRef.current.forEach((particle) => particle.update());
      requestFrameRef.current = requestAnimationFrame(animate);
      connect();
    }
  };

  function connect() {
    let opacityValue, distance;
    if (!connectionDistance.current) return;
    const squaredConnectionDistance =
      connectionDistance.current * connectionDistance.current;
    if (ctxRef.current) {
      for (let a = 0; a < particlesArrayRef.current.length; a++) {
        for (let b = a + 1; b < particlesArrayRef.current.length; b++) {
          distance =
            (particlesArrayRef.current[a].x - particlesArrayRef.current[b].x) **
              2 +
            (particlesArrayRef.current[a].y - particlesArrayRef.current[b].y) **
              2;

          if (distance < squaredConnectionDistance) {
            opacityValue = 1 - distance / squaredConnectionDistance;
            ctxRef.current.strokeStyle = `rgba(45, 140, 255, ${opacityValue})`;
            ctxRef.current.lineWidth = strokeWidth.current;
            ctxRef.current.beginPath();
            ctxRef.current.moveTo(
              particlesArrayRef.current[a].x,
              particlesArrayRef.current[a].y
            );
            ctxRef.current.lineTo(
              particlesArrayRef.current[b].x,
              particlesArrayRef.current[b].y
            );
            ctxRef.current.stroke();
          }
        }
      }
    }
  }

  function calculateParticleSettings() {
    const calcArea = height * width;
    let numberOfParticles = 5;
    let maxSize = 2;
    let connectionDistanceRaw = 3;

    if (calcArea >= 2000000) {
      numberOfParticles = 90;
      strokeWidth.current = 3;
      maxSize = 5;
      connectionDistanceRaw = 12;
    } else if (calcArea >= 1600000) {
       numberOfParticles = 70;
       strokeWidth.current = 3;
       maxSize = 5;
       connectionDistanceRaw = 10;
    } else if (calcArea >= 1000000) {
      numberOfParticles = 55;
      strokeWidth.current = 2;
      maxSize = 4;
      connectionDistanceRaw = 8;
    } else if (calcArea >= 800000) {
      numberOfParticles = 45;
      strokeWidth.current = 2;
      maxSize = 4;
      connectionDistanceRaw = 7;
    } else if (calcArea >= 630000) {
      numberOfParticles = 40;
      strokeWidth.current = 2;
      maxSize = 3;
      connectionDistanceRaw = 6;
    } else if (calcArea >= 300000) {
      numberOfParticles = 30;
      strokeWidth.current = 1;
      maxSize = 3;
      connectionDistanceRaw = 5;
    } else if (calcArea >= 200000) {
      numberOfParticles = 20;
      connectionDistanceRaw = 4;
      maxSize = 2;
    } else {
      connectionDistanceRaw = 3;
    }

    connectionDistance.current = Math.sqrt(
      (width / connectionDistanceRaw) * (height / connectionDistanceRaw)
    );


    return {
      numberOfParticles,
      maxSize,
    };
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      ctxRef.current = canvasRef.current.getContext("2d");
      init();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!requestFrameRef.current) {
          requestFrameRef.current = requestAnimationFrame(animate);
        }
      } else if (requestFrameRef.current) {
        cancelAnimationFrame(requestFrameRef.current);
        requestFrameRef.current = null;
      }
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && requestFrameRef.current) {
        cancelAnimationFrame(requestFrameRef.current);
        requestFrameRef.current = null;
      } else if (
        document.visibilityState === "visible" &&
        !requestFrameRef.current
      ) {

         requestFrameRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    const canvasElement = canvasRef.current;
    const currentFrameId = requestFrameRef.current;
    return () => {
      if (canvasElement) {
        observer.unobserve(canvasElement);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (currentFrameId) {
        cancelAnimationFrame(currentFrameId);
      }
    };
  }, [width, height]);

  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
  );
}
