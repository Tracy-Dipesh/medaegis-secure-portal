import { Shield } from "lucide-react";

interface MedAegisLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const MedAegisLogo = ({ className = "", showText = true, size = "md" }: MedAegisLogoProps) => {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    md: { icon: 28, text: "text-xl" },
    lg: { icon: 40, text: "text-3xl" },
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative">
        <Shield 
          size={sizes[size].icon} 
          className="text-primary fill-primary/10"
          strokeWidth={2}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-bold" style={{ fontSize: sizes[size].icon * 0.35 }}>+</span>
        </div>
      </div>
      {showText && (
        <span className={`font-semibold tracking-tight ${sizes[size].text}`}>
          <span className="text-foreground">Med</span>
          <span className="text-primary">Aegis</span>
        </span>
      )}
    </div>
  );
};
