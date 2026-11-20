import {
  IconArrowUp, IconBell, IconCheck, IconChevronDown, IconCompass, IconDots,
  IconFilter, IconHash, IconKey, IconLifebuoy, IconLock, IconMenu2, IconMessageCircle,
  IconMessages, IconMoon, IconPaperclip, IconPencil, IconPhone, IconPhoto, IconPlus,
  IconSearch, IconSend, IconSettings, IconShieldCheck, IconShieldLock, IconSparkles,
  IconSun, IconUser, IconUserPlus, IconUsers, IconUsersGroup, IconVideo, IconWorld,
  IconX,
} from "@tabler/icons-react";

export type IconName =
  | "messages" | "compass" | "users" | "user" | "settings" | "life-buoy"
  | "menu" | "sun" | "moon" | "plus" | "search" | "dots" | "shield-lock"
  | "paperclip" | "lock" | "arrow-up" | "user-plus" | "pencil" | "sparkles"
  | "shield-check" | "chevron-down" | "hash" | "world" | "check" | "x"
  | "send" | "photo" | "phone" | "video" | "bell" | "filter" | "users-group"
  | "key" | "message-circle";

const icons: Record<IconName, typeof IconUser> = {
  messages: IconMessages, compass: IconCompass, users: IconUsers, user: IconUser,
  settings: IconSettings, "life-buoy": IconLifebuoy, menu: IconMenu2, sun: IconSun,
  moon: IconMoon, plus: IconPlus, search: IconSearch, dots: IconDots,
  "shield-lock": IconShieldLock, paperclip: IconPaperclip, lock: IconLock,
  "arrow-up": IconArrowUp, "user-plus": IconUserPlus, pencil: IconPencil,
  sparkles: IconSparkles, "shield-check": IconShieldCheck, "chevron-down": IconChevronDown,
  hash: IconHash, world: IconWorld, check: IconCheck, x: IconX, send: IconSend,
  photo: IconPhoto, phone: IconPhone, video: IconVideo, bell: IconBell,
  filter: IconFilter, "users-group": IconUsersGroup, key: IconKey,
  "message-circle": IconMessageCircle,
};

export function Icon({ name, size = 18, strokeWidth = 1.8 }: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph aria-hidden="true" focusable="false" size={size} stroke={strokeWidth} className="quantum-icon" />;
}
