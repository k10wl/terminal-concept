interface Props {
  title: {
    name?: string;
    description?: string;
  };
}

export function TitleBar({ title }: Props) {
  return (
    <div className="pb-2">
      <div className="relative select-none border-b before:absolute before:inset-0 before:translate-y-1/2 before:border-x">
        <div className="flex justify-between px-2 text-2xs">
          <span className="empty:hidden">{title.name}</span>
          <span className="empty:hidden">{title.description}</span>
        </div>
      </div>
    </div>
  );
}
