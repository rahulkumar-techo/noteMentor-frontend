import AdCard from "./cards/AdCard";
import NoteCard from "./cards/NoteCard";
import QuestionCard from "./cards/QuestionCard";


export function FeedGrid({ items }: any) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item: any) => {
        switch (item.type) {
          case "note":
            return <NoteCard key={item.id} item={item} />;
          case "question":
            return <QuestionCard key={item.id} item={item} />;
          case "ad":
            return <AdCard key={item.id} item={item} />;
          default:
            return null;
        }
      })}
    </div>
  );
}