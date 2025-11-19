import type { IssueItem as IssueItemType } from "@/types/resume";

export function IssueItem({ item }: { item: IssueItemType }) {
  const statusColor = item.status === "pass" ? "text-green-600" : item.status === "warn" ? "text-yellow-500" : "text-red-600";

  return (
    <div className="border rounded p-3 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h4 className="font-semibold">{item.name}</h4>
            <span className={`text-sm ${statusColor} font-medium`}>{item.status.toUpperCase()}</span>
          </div>
          <div className="text-sm text-gray-600">Score: {item.score}</div>
        </div>
      </div>

      {item.comment && (
        <p className="mt-3 text-sm text-gray-700">{item.comment}</p>
      )}

      {item.suggestion && item.suggestion.length > 0 && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-800">
          <strong>Suggestion:</strong> {item.suggestion}
        </div>
      )}
    </div>
  );
}

export default IssueItem;
