import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxVisible = 5;
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisible / 2),
      totalPages - maxVisible + 1
    )
  );
  const pages = Array.from(
    { length: Math.min(maxVisible, totalPages) },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center gap-2 mt-6 mb-10 border-t border-[#334155] py-3">
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "ghost"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          <span className="text-gray-400">...</span>
          <Button variant="ghost" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
    </div>
  );
};

export default Pagination;
