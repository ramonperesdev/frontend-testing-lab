import './Avatar.css';

export interface AvatarProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

export function Avatar({ src, alt, size = 'medium' }: AvatarProps) {
  return (
    <img 
      src={src} 
      alt={alt}
      className={`avatar avatar--${size}`}
      data-testid="avatar"
    />
  );
}
