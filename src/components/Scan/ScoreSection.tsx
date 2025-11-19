import type { Section } from "@/types/resume";
import IssueItem from "./IssueItem";

export function ScoreSection({ section }: { section: Section }) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{section.title}</h3>
        <div className="text-lg font-bold">{section.score}</div>
      </div>

      <div className="mt-4 grid gap-4">
        {section.items.map((it, idx) => (
          <IssueItem key={idx} item={it} />
        ))}
      </div>
    </section>
  );
}

export default ScoreSection;
