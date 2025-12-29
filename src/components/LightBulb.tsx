import { cn } from "@/lib/utils";

interface LightBulbProps {
  isOn: boolean;
}

const LightBulb = ({ isOn }: LightBulbProps) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Wire */}
      <div className="w-0.5 h-16 bg-muted-foreground/40" />
      
      {/* Bulb socket */}
      <div className="w-8 h-4 bg-muted rounded-t-sm" />
      
      {/* Bulb */}
      <div
        className={cn(
          "relative w-20 h-24 rounded-b-full transition-all duration-700 ease-out",
          isOn 
            ? "bg-bulb-on light-glow animate-flicker" 
            : "bg-bulb-off"
        )}
      >
        {/* Inner filament glow */}
        {isOn && (
          <div className="absolute inset-4 rounded-full bg-primary/60 blur-sm animate-pulse-glow" />
        )}
      </div>
      
      {/* Ambient light cone when on */}
      {isOn && (
        <div 
          className="absolute top-40 w-40 h-60 opacity-20"
          style={{
            background: "linear-gradient(180deg, hsl(var(--ambient-glow) / 0.4) 0%, transparent 100%)",
            clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
          }}
        />
      )}
    </div>
  );
};

export default LightBulb;
