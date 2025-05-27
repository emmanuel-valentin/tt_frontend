import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { AnimatedBackground } from "~/components/shared/animated-background/animated-background";

export function HeroSection() {
  return (
    <section className="relative text-center space-y-6 py-16 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="landing" />

      {/* Additional Decorative Elements for Landing */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-20 left-12 w-1.5 h-1.5 bg-primary/80 rounded-full"></div>
        <div className="absolute top-32 right-16 w-1 h-1 bg-secondary/70 rounded-full"></div>
        <div className="absolute top-44 left-1/3 w-1 h-1 bg-primary/60 rounded-full"></div>
        <div className="absolute bottom-32 right-1/4 w-1.5 h-1.5 bg-secondary/80 rounded-full"></div>
        <div className="absolute bottom-44 left-20 w-1 h-1 bg-primary/70 rounded-full"></div>

        {/* Geometric shapes */}
        <div className="absolute top-16 right-1/3 w-2 h-2 border border-primary/40 rotate-45"></div>
        <div className="absolute bottom-36 left-1/4 w-2.5 h-2.5 border border-secondary/30 rotate-12"></div>
        <div className="absolute top-40 right-12 w-1.5 h-1.5 border border-primary/50 rotate-45"></div>

        {/* Color accents */}
        <div className="absolute top-24 left-1/4 w-8 h-8 bg-primary/5 rounded-full blur-sm"></div>
        <div className="absolute bottom-28 right-1/3 w-12 h-12 bg-secondary/5 rounded-full blur-md"></div>
        <div className="absolute top-36 right-1/4 w-6 h-6 bg-primary/8 rounded-full blur-sm"></div>
      </div>

      <div className="relative z-10 space-y-4">
        <Badge variant="secondary" className="px-4 py-2">
          Tecnología Avanzada en Fisioterapia
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Transformando la
          <span className="text-primary"> Fisioterapia</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <Link to="/auth/register">Comenzar Ahora</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/auth/login">Iniciar Sesión</Link>
        </Button>
      </div>

      {/* Wavy Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          className="relative block w-full h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,10 Q15,5 30,10 T60,10 T90,10 T120,10 T150,10 T180,10 T210,10 T240,10 T270,10 T300,10 T330,10 T360,10 T390,10 T420,10 T450,10 T480,10 T510,10 T540,10 T570,10 T600,10 T630,10 T660,10 T690,10 T720,10 T750,10 T780,10 T810,10 T840,10 T870,10 T900,10 T930,10 T960,10 T990,10 T1020,10 T1050,10 T1080,10 T1110,10 T1140,10 T1170,10 T1200,10 L1200,20 L0,20 Z"
            className="fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
}
