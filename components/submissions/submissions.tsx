import { SubmissionsTable } from "./submissions-table";

export default function Submission({ submissions }: { submissions: any }) {
  return (
    <div className="w-full flex flex-row py-4 px-6 h-[450px]">
      {submissions?.length > 0 ? (
        <SubmissionsTable submissions={submissions} />
      ) : (
        <p className="text-center mt-20">No submissions yet.</p>
      )}
    </div>
  );
}
