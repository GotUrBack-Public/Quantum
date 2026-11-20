import { Icon } from "./icon";

type UserAvatarProps = {
  name: string;
  src?: string | null;
  className?: string;
  online?: boolean;
  size?: "small" | "medium" | "large";
};

export function UserAvatar({ name, src, className = "", online = false, size = "medium" }: UserAvatarProps) {
  return (
    <span className={`user-avatar user-avatar--${size} ${className}`} role="img" aria-label={`Profilbild von ${name}`}>
      {src ? <img src={src} alt="" loading="lazy" /> : <Icon name="user" size={size === "small" ? 15 : size === "large" ? 30 : 21} strokeWidth={1.65} />}
      {online && <i className="user-avatar__status" aria-label="Online" />}
    </span>
  );
}
