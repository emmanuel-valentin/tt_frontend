interface Props {
  children: React.ReactNode;
}

export function Card({ children }: Props) {
  return (
    <div className="bg-gray-100 rounded-lg cursor-pointer p-4 w-full">
      {children}
    </div>
  );
}
