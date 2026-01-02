import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface LightSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const LightSwitch = ({ isOn, onToggle }: LightSwitchProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Switch
        checked={isOn}
        onCheckedChange={onToggle}
        className={cn(
          "h-8 w-16 transition-all duration-300",
          isOn && "subtle-glow"
        )}
      />
      <span 
        className={cn(
          "text-sm font-medium tracking-widest uppercase transition-all duration-500",
          isOn 
            ? "text-primary text-glow" 
            : "text-muted-foreground"
        )}
      >
        {isOn ? "On" : "Off"}
      </span>
    </div>
  );
};

export default LightSwitch;
