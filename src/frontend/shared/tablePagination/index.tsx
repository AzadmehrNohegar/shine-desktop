import { LeftChevron, RightChevron } from "@frontend/assets/svg";
import { Button } from "@frontend/components";

interface ITablePaginationProps {
  page: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPage: any;
  count: number;
}

function TablePagination({ page, setPage, count }: ITablePaginationProps) {
  return (
    <div className="w-full flex items-center px-4">
      <Button
        size="touch"
        variant="ghost"
        onClick={() => setPage((prevState: number) => prevState + 1)}
        disabled={page === Math.ceil(count / 10)}
      >
        <RightChevron />
      </Button>
      <span>صفحه {page}</span>
      <Button
        size="touch"
        variant="ghost"
        onClick={() => setPage((prevState: number) => prevState - 1)}
        disabled={page === 1}
      >
        <LeftChevron />
      </Button>
      <span className="inline-block mr-auto">تعداد کل داده ها: {count}</span>
    </div>
  );
}

export { TablePagination };
