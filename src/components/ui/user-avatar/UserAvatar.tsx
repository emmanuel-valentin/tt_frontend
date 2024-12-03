import Image from 'next/image';

interface Props {
  size: number;
  src?: string;
}

export function UserAvatar({ size, src }: Props) {
  return (
    <Image
      src={src ?? 'user-avatar.svg'}
      className={`w-${size} h-${size} rounded-full`}
      alt="User avatar"
      width={size}
      height={size}
    />
  );
}
