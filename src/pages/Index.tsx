import { useState } from "react";
import LightBulb from "@/components/LightBulb";
import LightSwitch from "@/components/LightSwitch";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isLightOn, setIsLightOn] = useState(false);

  return (
    <div 
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center transition-all duration-1000 overflow-hidden",
        isLightOn 
          ? "bg-gradient-to-b from-background via-background to-secondary" 
          : "bg-background"
      )}
    >
      {/* Ambient background glow when light is on */}
      {isLightOn && (
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle, hsl(var(--ambient-glow) / 0.5) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <LightBulb isOn={isLightOn} />
        <LightSwitch isOn={isLightOn} onToggle={() => setIsLightOn(!isLightOn)} />
      </div>

      {/* Footer hint */}
      <p 
        className={cn(
          "absolute bottom-8 text-xs tracking-wider transition-all duration-500",
          isLightOn 
            ? "text-muted-foreground/60" 
            : "text-muted-foreground/30"
        )}
      >
        Toggle the switch
      </p>
    </div>
  );
};

export default Index;
