import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

export function CtaSection() {
  return (
    <section className="text-center space-y-8 py-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
      <div className="relative z-10">
        <Badge>¡Únete Ahora!</Badge>
        <h2 className="text-3xl md:text-5xl font-bold mt-4">
          ¿Listo para Transformar tu Práctica?
        </h2>
        <p className="text-lg text-blue-100 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="mt-6">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-slate-100 dark:text-blue-700 dark:hover:bg-slate-200"
            asChild
          >
            <Link to="/auth/register">Comenzar Gratis</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
