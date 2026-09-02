export function RichInline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\*\*(.+)\*\*$/);
        if (match) {
          return (
            <strong key={index} className="text-white font-semibold">
              {match[1]}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
