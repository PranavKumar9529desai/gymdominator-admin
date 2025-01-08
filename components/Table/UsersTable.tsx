"use client";

import { useState, useMemo } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { DataTableProps } from "./table.types";
import { TableUI } from "./TableUi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
export function DataTable<TData>({
  data,
  columns,
  filterColumn,
  selectable = false,
  dropdownConfig,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const enhancedColumns = useMemo(() => {
    if (!dropdownConfig) return columns;

    return columns.map((column) => {
      if (column.id === dropdownConfig.columnId) {
        return {
          ...column,
          //@ts-expect-error - this is a hack to add a dropdown to the column
          cell: ({ row }) => (
            <Select
              value={row.getValue(dropdownConfig.columnId)}
              onValueChange={(value) =>
                dropdownConfig.onSelect(row.original.id, value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {dropdownConfig.options.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        };
      }
      return column;
    });
  }, [columns, dropdownConfig]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectable,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <TableUI
      table={table}
      filterColumn={filterColumn}
      columns={enhancedColumns}
    />
  );
}
