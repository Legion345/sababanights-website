import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: IconProp;
  size?: SizeProp;
  className?: string;
  spin?: boolean;
  pulse?: boolean;
  fixedWidth?: boolean;
}

/**
 * Reusable icon component wrapping Font Awesome
 * Provides type safety and consistent styling
 *
 * @example
 * <Icon icon={faHome} size="lg" className="text-red-600" />
 */
export function Icon({
  icon,
  size = '1x',
  className,
  spin = false,
  pulse = false,
  fixedWidth = false
}: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      spin={spin}
      pulse={pulse}
      fixedWidth={fixedWidth}
      className={cn(className)}
    />
  );
}
