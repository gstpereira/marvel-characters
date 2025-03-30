import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-6 mb-10 border-t border-[#334155] py-3">
      {Array.from({ length: totalPages > 5 ? 5 : totalPages }).map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? "default" : "ghost"}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      {totalPages > 5 && <span className="text-gray-400">...</span>}
      {totalPages > 5 && (
        <Button variant="ghost" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </Button>
      )}
    </div>
  );
}
