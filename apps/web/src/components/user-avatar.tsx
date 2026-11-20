import { useState } from "react";
import { Icon } from "./icon";

type UserAvatarProps = {
  name: string;
  src?: string | null;
  className?: string;
  online?: boolean;
  size?: "small" | "medium" | "large";
};

export function UserAvatar({ name, src, className = "", online = false, size = "medium" }: UserAvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src && failedSrc !== src);

  return (
    <span className={`user-avatar user-avatar--${size} ${className}`} role="img" aria-label={`Profilbild von ${name}`}>
      {showImage ? (
        <img src={src!} alt="" loading="lazy" onError={() => setFailedSrc(src ?? null)} />
      ) : (
        <Icon name="user" size={size === "small" ? 15 : size === "large" ? 30 : 21} strokeWidth={1.65} />
      )}
      {online && <i className="user-avatar__status" aria-label="Online" />}
    </span>
  );
}
