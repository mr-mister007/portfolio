interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

/**
 * Static card wrapper — tilt functionality removed.
 */
const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export { TiltCard };
export default TiltCard;
