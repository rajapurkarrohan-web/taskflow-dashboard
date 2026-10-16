
export default function SummaryCard({ title, value, color }) {
  return (
    <div className={`rounded-xl border border-[#E4E4F1] p-5 ${color}`}>
      <p className="text-sm font-medium text-[#6C7493]">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-semibold text-[#19171A]">
        {value}
      </h2>
    </div>
  );
}
