import {
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import * as React from "react";

import { cn } from "~/utils/utils";
import Checkbox from "~/components/ui/Checkbox";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    scroll?: { x?: number; y?: number };
  }
>(({ className, scroll, children, ...props }, ref) => {
  const [tableWidth, setTableWidth] = React.useState<number | null>(null);

  // Use the forwarded ref to measure table width
  const tableRef = React.useRef<HTMLTableElement | null>(null);

  // Combine the forwarded ref with our internal ref
  React.useImperativeHandle(
    ref,
    () => ({
      ...tableRef.current!,
      getParentElement: () => tableRef.current?.parentElement,
      getParentWidth: () => tableRef.current?.parentElement?.offsetWidth || 0,
      getTableWidth: () => tableWidth,
      forceUpdateWidth: () => {
        if (tableRef.current) {
          const width = tableRef.current.offsetWidth;
          setTableWidth(width);
        }
      },
    }),
    [tableWidth]
  );

  React.useEffect(() => {
    // Measure width function
    const measureWidth = () => {
      if (tableRef.current?.parentElement) {
        // Force reflow to ensure DOM measurements are accurate
        void tableRef.current.parentElement.offsetHeight;
        void tableRef.current.parentElement.offsetWidth;

        const parentRect =
          tableRef.current.parentElement.getBoundingClientRect();
        const parentStyle = window.getComputedStyle(
          tableRef.current.parentElement
        );
        const paddingLeft = parseFloat(parentStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(parentStyle.paddingRight) || 0;
        const borderLeft = parseFloat(parentStyle.borderLeftWidth) || 0;
        const borderRight = parseFloat(parentStyle.borderRightWidth) || 0;
        const parentWidth = Math.floor(
          parentRect.width -
            paddingLeft -
            paddingRight -
            borderLeft -
            borderRight
        );

        // Only update if width actually changed to prevent unnecessary re-renders
        setTableWidth(prevWidth => {
          if (prevWidth !== parentWidth) {
            return parentWidth;
          }
          return prevWidth;
        });
      }
    };

    // Initial measurement
    const initialTimer = setTimeout(measureWidth, 100);

    // Use ResizeObserver to watch for parent size changes
    let resizeObserver: ResizeObserver | null = null;

    if (tableRef.current?.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        // Debounce resize events to prevent excessive updates
        clearTimeout((resizeObserver as any).debounceTimer);
        (resizeObserver as any).debounceTimer = setTimeout(() => {
          measureWidth();
        }, 16);
      });

      // Observe the parent element
      resizeObserver.observe(tableRef.current.parentElement);
    }

    // Listen for sidebar toggle events as backup
    const handleSidebarToggle = () => {
      // Clear any pending measurements
      clearTimeout(initialTimer);
    };

    window.addEventListener("toggleSidebar", handleSidebarToggle);

    return () => {
      clearTimeout(initialTimer);
      if (resizeObserver) {
        resizeObserver.disconnect();
        clearTimeout((resizeObserver as any).debounceTimer);
      }
      window.removeEventListener("toggleSidebar", handleSidebarToggle);
    };
  }, []);

  if (scroll) {
    // Table always uses its actual measured width
    const finalTableWidth = tableWidth ? `${tableWidth}px` : "100%";

    // Only show scroll when scroll.x is greater than tableWidth
    const shouldShowScroll = scroll.x && tableWidth && scroll.x > tableWidth;

    // When scroll.y is present, we need to structure differently
    if (scroll.y) {
      return (
        <div className="rounded-lg border border-gray-200">
          {/* Fixed Header */}
          <div className="overflow-hidden">
            <table
              ref={tableRef}
              className={cn("w-full caption-bottom", className)}
              style={{
                width: finalTableWidth,
                minWidth: "100%",
                tableLayout: shouldShowScroll ? "fixed" : "auto",
                borderCollapse: "collapse",
              }}
              {...props}
            >
              {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === TableHeader) {
                  return child;
                }
                return null;
              })}
            </table>
          </div>

          {/* Scrollable Body */}
          <div
            className="custom-scrollbar overflow-auto"
            style={{ maxHeight: `${scroll.y}px` }}
          >
            <table
              className={cn("w-full caption-bottom", className)}
              style={{
                width: finalTableWidth,
                minWidth: "100%",
                tableLayout: shouldShowScroll ? "fixed" : "auto",
                borderCollapse: "collapse",
              }}
              {...props}
            >
              {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type !== TableHeader) {
                  return child;
                }
                return null;
              })}
            </table>
          </div>
        </div>
      );
    }

    // Horizontal scroll only
    return (
      <div
        className="custom-scrollbar overflow-hidden rounded-lg border border-gray-200"
        style={{
          ...(shouldShowScroll && { maxWidth: "100%", overflow: "auto" }),
        }}
      >
        <table
          ref={tableRef}
          className={cn("w-full caption-bottom divide-y", className)}
          style={{
            width: finalTableWidth,
            minWidth: "100%",
            tableLayout: shouldShowScroll ? "fixed" : "auto",
            borderCollapse: "collapse",
          }}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }

  return (
    <table
      ref={tableRef}
      className={cn(
        "w-full caption-bottom divide-y border border-gray-200",
        className
      )}
      style={{
        tableLayout: "auto",
        borderCollapse: "collapse",
      }}
      {...props}
    >
      {children}
    </table>
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("bg-gray-50", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("bg-white", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-gray-50 font-medium", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-gray-100 transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-blue-50",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    fixed?: boolean | "left" | "right";
    width?: string | number;
  }
>(({ className, fixed, width, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 border-r border-gray-200 px-4 text-left align-middle font-medium text-gray-700 last:border-r-0 [&:has([role=checkbox])]:pr-0",
      fixed === "left" && "sticky left-0 z-10 bg-gray-50",
      fixed === "right" && "sticky right-0 z-10 bg-gray-50",
      className
    )}
    style={{
      ...(width && { width }),
      ...(fixed === "left" && { left: 0 }),
      ...(fixed === "right" && { right: 0 }),
    }}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    fixed?: boolean | "left" | "right";
    width?: string | number;
  }
>(({ className, fixed, width, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "border-r border-gray-100 p-4 align-middle last:border-r-0 [&:has([role=checkbox])]:pr-0",
      fixed === "left" && "sticky left-0 z-10 bg-white",
      fixed === "right" && "sticky right-0 z-10 bg-white",
      className
    )}
    style={{
      ...(width && { width }),
      ...(fixed === "left" && { left: 0 }),
      ...(fixed === "right" && { right: 0 }),
    }}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-gray-500", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// Ant Design Table Types
export interface ColumnType<T = any> {
  title: React.ReactNode;
  dataIndex?: string;
  key?: string;
  width?: string | number;
  ellipsis?: boolean;
  fixed?: boolean | "left" | "right";
  align?: "left" | "center" | "right";
  className?: string;
  onCell?: (
    record: T,
    index: number
  ) => React.TdHTMLAttributes<HTMLTableCellElement>;
  onHeaderCell?: (
    column: ColumnType<T>
  ) => React.ThHTMLAttributes<HTMLTableCellElement>;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  sorter?: boolean | ((a: T, b: T) => number);
  sortDirections?: ("ascend" | "descend")[];
  defaultSortOrder?: "ascend" | "descend";
  filters?: { text: string; value: string | number | boolean }[];
  onFilter?: (value: string | number | boolean, record: T) => boolean;
  filterMultiple?: boolean;
  filterMode?: "menu" | "tree";
  filterSearch?: boolean;
  children?: ColumnType<T>[];
}

export interface TablePaginationConfig {
  current?: number;
  pageSize?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  pageSizeOptions?: string[];
  size?: "default" | "small";
  position?: "top" | "bottom" | "both";
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

export interface TableProps<T = any> {
  dataSource?: T[];
  columns?: ColumnType<T>[];
  pagination?: TablePaginationConfig | false;
  loading?: boolean | { spinning?: boolean; tip?: string };
  bordered?: boolean;
  size?: "large" | "middle" | "small";
  title?: (currentPageData: T[]) => React.ReactNode;
  footer?: (currentPageData: T[]) => React.ReactNode;
  rowKey?: string | ((record: T, index: number) => string);
  rowClassName?: string | ((record: T, index: number) => string);
  onRow?: (
    record: T,
    index: number
  ) => React.HTMLAttributes<HTMLTableRowElement>;
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  scroll?: { x?: number; y?: number };
  expandable?: {
    expandedRowKeys?: React.Key[];
    defaultExpandedRowKeys?: React.Key[];
    expandedRowRender?: (
      record: T,
      index: number,
      indent: number,
      expanded: boolean
    ) => React.ReactNode;
    expandRowByClick?: boolean;
    expandIcon?: (props: {
      expanded: boolean;
      onExpand: (e: React.MouseEvent) => void;
      record: T;
    }) => React.ReactNode;
    onExpand?: (expanded: boolean, record: T) => void;
    onExpandedRowsChange?: (expandedRows: React.Key[]) => void;
    treeColumnIndex?: number;
    indentSize?: number;
  };
  rowSelection?: {
    selectedRowKeys?: React.Key[];
    defaultSelectedRowKeys?: React.Key[];
    type?: "checkbox" | "radio";
    onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
    onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
    onSelectAll?: (
      selected: boolean,
      selectedRows: T[],
      changeRows: T[]
    ) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string };
    checkStrictly?: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

// Ant Design Table Component
const AntTable = <T extends Record<string, any> = any>({
  dataSource = [],
  columns = [],
  pagination,
  loading = false,
  bordered = false,
  size = "middle",
  title,
  footer,
  rowKey = "key",
  rowClassName,
  onRow,
  onChange,
  expandable,
  rowSelection,
  className,
  style,
  scroll,
  ...props
}: TableProps<T>) => {
  // Internal state for uncontrolled components
  const [internalPagination, setInternalPagination] = React.useState({
    current:
      (pagination && typeof pagination === "object"
        ? pagination.defaultCurrent
        : undefined) || 1,
    pageSize:
      (pagination && typeof pagination === "object"
        ? pagination.defaultPageSize
        : undefined) || 10,
  });

  const [internalSorter, setInternalSorter] = React.useState<{
    field?: string;
    order?: "ascend" | "descend";
  }>({});

  const [internalFilters, setInternalFilters] = React.useState<
    Record<string, any>
  >({});

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
    rowSelection?.defaultSelectedRowKeys || []
  );

  const [expandedRowKeys, setExpandedRowKeys] = React.useState<React.Key[]>(
    expandable?.defaultExpandedRowKeys || []
  );

  // Get row key
  const getRowKey = React.useCallback(
    (record: T, index: number): string => {
      if (typeof rowKey === "function") {
        return rowKey(record, index);
      }
      return record[rowKey] || index.toString();
    },
    [rowKey]
  );

  // Get all keys from data source (including nested children)
  const getAllKeysFromDataSource = React.useCallback(
    (nodes: T[]): string[] => {
      const keys: string[] = [];

      nodes.forEach(node => {
        keys.push(getRowKey(node, 0));
        if (node.children && node.children.length > 0) {
          keys.push(...getAllKeysFromDataSource(node.children as T[]));
        }
      });

      return keys;
    },
    [getRowKey]
  );

  // Get all enabled keys from data source (including nested children)
  const getAllEnabledKeysFromDataSource = React.useCallback(
    (nodes: T[]): string[] => {
      const keysSet = new Set<string>();

      const collectKeys = (nodes: T[]) => {
        nodes.forEach(node => {
          const checkboxProps = rowSelection?.getCheckboxProps?.(node) || {};
          if (!checkboxProps.disabled) {
            keysSet.add(getRowKey(node, 0));
          }
          if (node.children && node.children.length > 0) {
            collectKeys(node.children as T[]);
          }
        });
      };

      collectKeys(nodes);
      return Array.from(keysSet);
    },
    [getRowKey, rowSelection]
  );

  // Flatten tree data for rendering
  const flattenData = React.useCallback(
    (
      nodes: T[],
      level: number = 0
    ): Array<T & { _level: number; _hasChildren: boolean }> => {
      const result: Array<T & { _level: number; _hasChildren: boolean }> = [];

      nodes.forEach((node, index) => {
        const hasChildren = !!(node.children && node.children.length > 0);
        const nodeKey = getRowKey(node, index);

        result.push({
          ...node,
          _level: level,
          _hasChildren: hasChildren,
        });

        if (hasChildren && expandedRowKeys.includes(nodeKey)) {
          result.push(...flattenData(node.children as T[], level + 1));
        }
      });

      return result;
    },
    [expandedRowKeys, getRowKey]
  );

  // Handle expand/collapse
  const handleExpand = React.useCallback(
    (record: T, _event: React.MouseEvent) => {
      const key = getRowKey(record, 0);
      const newExpandedKeys = expandedRowKeys.includes(key)
        ? expandedRowKeys.filter(k => k !== key)
        : [...expandedRowKeys, key];

      setExpandedRowKeys(newExpandedKeys);
      expandable?.onExpandedRowsChange?.(newExpandedKeys);
      expandable?.onExpand?.(!expandedRowKeys.includes(key), record);
    },
    [expandedRowKeys, getRowKey, expandable]
  );

  // Handle select all
  const handleSelectAll = React.useCallback(
    (selected: boolean, selectedRows: T[], changeRows: T[]) => {
      console.log(selected, selectedRows, changeRows);

      // Get all enabled keys including children for tree table
      const getAllEnabledKeys = (rows: T[]): string[] => {
        const keysSet = new Set<string>();

        const collectKeys = (rows: T[]) => {
          rows.forEach(row => {
            const checkboxProps = rowSelection?.getCheckboxProps?.(row) || {};
            if (!checkboxProps.disabled) {
              keysSet.add(getRowKey(row, 0));
            }
            if (row.children && row.children.length > 0) {
              collectKeys(row.children as T[]);
            }
          });
        };

        collectKeys(rows);
        return Array.from(keysSet);
      };

      const newSelectedKeys = selected
        ? getAllEnabledKeys(changeRows)
        : selectedRowKeys.filter(
            key => !changeRows.some(row => getRowKey(row, 0) === key.toString())
          );

      setSelectedRowKeys(newSelectedKeys);
      rowSelection?.onSelectAll?.(selected, selectedRows, changeRows);
    },
    [selectedRowKeys, getRowKey, rowSelection]
  );

  // Helpers for cascading selection like Ant Design when checkStrictly=false
  const collectDescendantKeys = React.useCallback(
    (node: T): string[] => {
      const keys: string[] = [];
      const traverse = (n: T) => {
        const nodeKey = getRowKey(n, 0);
        keys.push(nodeKey);
        if ((n as any).children && (n as any).children.length > 0) {
          (n as any).children.forEach((child: T) => traverse(child));
        }
      };
      traverse(node);
      return keys;
    },
    [getRowKey]
  );

  const findParentChain = React.useCallback(
    (nodes: T[], targetKey: string, path: string[] = []): string[] | null => {
      for (const n of nodes) {
        const key = getRowKey(n, 0);
        const currentPath = [...path, key];
        if (key === targetKey) return currentPath;
        if ((n as any).children && (n as any).children.length > 0) {
          const found = findParentChain(
            (n as any).children,
            targetKey,
            currentPath
          );
          if (found) return found;
        }
      }
      return null;
    },
    [getRowKey]
  );

  const getNodeByKey = React.useCallback(
    (nodes: T[], key: string): T | null => {
      for (const n of nodes) {
        if (getRowKey(n, 0) === key) return n;
        if ((n as any).children && (n as any).children.length > 0) {
          const found = getNodeByKey((n as any).children, key);
          if (found) return found;
        }
      }
      return null;
    },
    [getRowKey]
  );

  // Handle individual row selection
  const handleRowSelect = React.useCallback(
    (record: T, selected: boolean) => {
      const key = getRowKey(record, 0);

      // Radio mode
      if (rowSelection?.type === "radio") {
        const newKeys = selected ? [key] : [];
        setSelectedRowKeys(newKeys);
        rowSelection?.onSelect?.(
          record,
          selected,
          dataSource.filter(row => newKeys.includes(getRowKey(row, 0)))
        );
        return;
      }

      // Checkbox mode
      const nextKeys = new Set<string>(selectedRowKeys.map(k => k.toString()));

      if (selected) {
        nextKeys.add(key);
      } else {
        nextKeys.delete(key);
      }

      // Cascade when not strict
      if (expandable && rowSelection && rowSelection.checkStrictly === false) {
        // include all descendants
        const descKeys = collectDescendantKeys(record);
        descKeys.forEach(k =>
          selected ? nextKeys.add(k) : nextKeys.delete(k)
        );

        // walk up parents: if all children selected -> select parent; if any unchecked -> unselect parent
        const chain = findParentChain(dataSource, key) || [];
        // exclude the node itself; iterate parents
        for (let i = chain.length - 2; i >= 0; i--) {
          const parentKeyMaybe = chain[i];
          if (!parentKeyMaybe) continue;
          const parentKey = parentKeyMaybe as string;
          const parent = getNodeByKey(dataSource, parentKey);
          if (!parent) continue;
          const children: T[] = ((parent as any).children || []) as T[];
          const allChildSelected = children.every(c =>
            nextKeys.has(getRowKey(c, 0))
          );
          if (allChildSelected) {
            nextKeys.add(parentKey);
          } else {
            nextKeys.delete(parentKey);
          }
        }
      }

      const newSelectedKeys = Array.from(nextKeys);
      setSelectedRowKeys(newSelectedKeys);
      rowSelection?.onSelect?.(
        record,
        selected,
        dataSource.filter(row => newSelectedKeys.includes(getRowKey(row, 0)))
      );
    },
    [
      selectedRowKeys,
      getRowKey,
      rowSelection,
      dataSource,
      expandable,
      collectDescendantKeys,
      findParentChain,
      getNodeByKey,
    ]
  );

  // Get flattened data for tree table
  const flatData = React.useMemo(() => {
    if (expandable) {
      return flattenData(dataSource);
    }
    return dataSource;
  }, [dataSource, expandable, flattenData]);

  // Handle pagination change
  const handlePaginationChange = React.useCallback(
    (page: number, pageSize: number) => {
      const newPagination = { current: page, pageSize };
      setInternalPagination(newPagination);

      onChange?.(newPagination, internalFilters, internalSorter, {
        action: "paginate",
        currentDataSource: dataSource,
      });
    },
    [onChange, internalFilters, internalSorter, dataSource]
  );

  // Handle sorter change
  const handleSorterChange = React.useCallback(
    (field: string, order: "ascend" | "descend" | null) => {
      const newSorter = order ? { field, order } : {};
      setInternalSorter(newSorter);

      onChange?.(internalPagination, internalFilters, newSorter, {
        action: "sort",
        currentDataSource: dataSource,
      });
    },
    [onChange, internalPagination, internalFilters, dataSource]
  );

  // Handle filter change
  const handleFilterChange = React.useCallback(
    (filters: Record<string, any>) => {
      setInternalFilters(filters);

      onChange?.(internalPagination, filters, internalSorter, {
        action: "filter",
        currentDataSource: dataSource,
      });
    },
    [onChange, internalPagination, internalSorter, dataSource]
  );

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!internalSorter.field || !internalSorter.order) return flatData;

    const column = columns.find(
      col =>
        col.key === internalSorter.field ||
        col.dataIndex === internalSorter.field
    );
    if (!column || !column.sorter) return flatData;

    const sorterFn =
      typeof column.sorter === "function" ? column.sorter : undefined;
    if (!sorterFn) return flatData;

    return [...flatData].sort((a, b) => {
      const result = sorterFn(a, b);
      return internalSorter.order === "descend" ? -result : result;
    });
  }, [flatData, internalSorter, columns]);

  // Filter data
  const filteredData = React.useMemo(() => {
    let result = sortedData;

    Object.entries(internalFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        const column = columns.find(
          col => col.key === key || col.dataIndex === key
        );
        if (column?.onFilter) {
          result = result.filter(record =>
            values.some((value: any) => column.onFilter!(value, record))
          );
        }
      }
    });

    return result;
  }, [sortedData, internalFilters, columns]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (pagination === false) return filteredData;

    const { current, pageSize } = internalPagination;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;

    return filteredData.slice(start, end);
  }, [filteredData, internalPagination, pagination]);

  // Normalize loading to boolean
  const isLoading = React.useMemo(() => {
    if (typeof loading === "boolean") return loading;
    if (loading && typeof loading === "object") return !!loading.spinning;
    return false;
  }, [loading]);

  // Size classes
  const sizeClasses = {
    small: "text-sm",
    middle: "",
    large: "text-lg",
  };

  const cellPadding = {
    small: "p-2",
    middle: "p-4",
    large: "p-6",
  };

  // Render sort icon
  const renderSortIcon = (column: ColumnType<T>) => {
    if (!column.sortable) return null;

    const isActive = internalSorter.field === (column.key || column.dataIndex);
    const order = isActive ? internalSorter.order : null;

    return (
      <span className="ml-2 cursor-pointer">
        {order === "ascend" ? (
          <ArrowUp className="h-3 w-3 text-blue-600" />
        ) : order === "descend" ? (
          <ArrowDown className="h-3 w-3 text-blue-600" />
        ) : (
          <ArrowUpDown className="h-3 w-3 text-gray-400" />
        )}
      </span>
    );
  };

  // Render filter dropdown
  const renderFilterDropdown = (column: ColumnType<T>) => {
    if (!column.filters) return null;

    const currentFilters =
      internalFilters[column.key || column.dataIndex || ""] || [];
    const isActive = currentFilters.length > 0;

    return (
      <div className="relative ml-2">
        <button
          onClick={e => {
            e.stopPropagation();
            // Toggle filter dropdown
            const field = column.key || column.dataIndex;
            if (!field) return;

            const dropdown = e.currentTarget.nextElementSibling as HTMLElement;
            if (dropdown) {
              dropdown.classList.toggle("hidden");
            }
          }}
          className={`inline-flex items-center rounded px-2 py-1 text-xs transition-colors ${
            isActive
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Filter
          {isActive && (
            <span className="ml-1 rounded-full bg-blue-600 px-1 text-xs text-white">
              {currentFilters.length}
            </span>
          )}
        </button>

        <div className="absolute right-0 top-full z-10 mt-1 hidden min-w-32 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
          {column.filters.map(filter => (
            <label
              key={filter.value.toString()}
              className="flex items-center space-x-2 p-1 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={currentFilters.includes(filter.value)}
                onChange={e => {
                  const field = column.key || column.dataIndex;
                  if (!field) return;

                  const newFilters = e.target.checked
                    ? [...currentFilters, filter.value.toString()]
                    : currentFilters.filter(
                        (v: any) => v !== filter.value.toString()
                      );

                  handleFilterChange({
                    ...internalFilters,
                    [field]: newFilters,
                  });
                }}
                className="h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{filter.text}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Handle sort click
  const handleSortClick = (column: ColumnType<T>) => {
    // Chỉ xử lý sắp xếp nếu column có sortable = true
    if (!column.sortable) return;

    const field = column.key || column.dataIndex;
    if (!field) return;

    let nextOrder: "ascend" | "descend" | null = "ascend";

    if (internalSorter.field === field) {
      if (internalSorter.order === "ascend") {
        nextOrder = "descend";
      } else if (internalSorter.order === "descend") {
        nextOrder = null;
      }
    }

    handleSorterChange(field, nextOrder);
  };

  // Render expand icon
  const renderExpandIcon = (
    record: T & { _level: number; _hasChildren: boolean }
  ) => {
    if (!record._hasChildren) {
      return <span className="inline-block h-4 w-4" />;
    }

    const isExpanded = expandedRowKeys.includes(getRowKey(record, 0));
    const expandIcon = expandable?.expandIcon;

    if (expandIcon) {
      return expandIcon({
        expanded: isExpanded,
        onExpand: e => handleExpand(record, e),
        record,
      });
    }

    return (
      <button
        onClick={e => handleExpand(record, e)}
        className="inline-flex h-4 w-4 items-center justify-center rounded transition-colors hover:bg-gray-100"
        type="button"
      >
        {isExpanded ? (
          <Minus className="h-3 w-3" />
        ) : (
          <Plus className="h-3 w-3" />
        )}
      </button>
    );
  };

  // Render selection checkbox or radio
  const renderSelectionCheckbox = (record: T) => {
    if (!rowSelection) return null;

    const key = getRowKey(record, 0);
    const isSelected = selectedRowKeys.includes(key);
    const checkboxProps = rowSelection.getCheckboxProps?.(record) || {};

    // Compute indeterminate when cascading is enabled (not strict)
    let indeterminate = false;
    if (expandable && rowSelection.checkStrictly === false) {
      const children: T[] = ((record as any).children || []) as T[];
      if (children.length > 0) {
        const childKeys = children.map(c => getRowKey(c, 0));
        const selectedChildCount = childKeys.filter(k =>
          selectedRowKeys.includes(k)
        ).length;
        indeterminate =
          selectedChildCount > 0 && selectedChildCount < childKeys.length;
      }
    }

    if (rowSelection.type === "radio") {
      return (
        <div className="flex items-center justify-center">
          <input
            type="radio"
            checked={isSelected}
            disabled={checkboxProps.disabled}
            onChange={e => {
              if (e.target.checked) {
                handleRowSelect(record, true);
              }
            }}
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={isSelected}
          indeterminate={indeterminate}
          disabled={checkboxProps.disabled}
          onCheckedChange={(checked: boolean) =>
            handleRowSelect(record, checked)
          }
        />
      </div>
    );
  };

  // Render select all checkbox
  const renderSelectAllCheckbox = () => {
    if (!rowSelection || rowSelection.type === "radio") return null;

    const allEnabledKeys = expandable
      ? getAllEnabledKeysFromDataSource(dataSource)
      : flatData
          .map(record => getRowKey(record, 0))
          .filter(key => {
            const record = flatData.find(r => getRowKey(r, 0) === key);
            if (!record) return false;
            const checkboxProps = rowSelection.getCheckboxProps?.(record) || {};
            return !checkboxProps.disabled;
          });

    const selectedKeys = selectedRowKeys.filter(key =>
      allEnabledKeys.includes(key.toString())
    );
    const isAllSelected =
      selectedKeys.length > 0 && selectedKeys.length === allEnabledKeys.length;
    const isIndeterminate =
      selectedKeys.length > 0 && selectedKeys.length < allEnabledKeys.length;

    return (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onCheckedChange={(checked: boolean) => {
            // when cascading selection, select all means include all enabled nodes in tree
            if (expandable && rowSelection.checkStrictly === false) {
              const enabledKeys = getAllEnabledKeysFromDataSource(dataSource);
              const newKeys = checked ? enabledKeys : [];
              setSelectedRowKeys(newKeys);
              rowSelection.onSelectAll?.(
                checked,
                dataSource as any,
                dataSource as any
              );
              return;
            }

            if (isIndeterminate && !checked) {
              handleSelectAll(true, flatData as any, flatData as any);
            } else {
              handleSelectAll(checked, flatData as any, flatData as any);
            }
          }}
        />
      </div>
    );
  };

  return (
    <div className={cn("", className)} style={style}>
      {/* Title */}
      {title && (
        <div className="mb-4 text-lg font-semibold">
          {typeof title === "function" ? title(paginatedData) : title}
        </div>
      )}

      {/* Table */}

      <Table
        className={cn(
          sizeClasses[size],
          bordered && "border border-gray-200",
          loading && "opacity-50"
        )}
        scroll={scroll}
        {...props}
      >
        <TableHeader>
          <TableRow>
            {/* Selection column */}
            {rowSelection && (
              <TableHead className="w-12">
                {renderSelectAllCheckbox()}
              </TableHead>
            )}
            {columns.map((column, index) => (
              <TableHead
                key={column.key || column.dataIndex || index}
                className={cn(
                  column.className,
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  column.sortable ||
                    (column.sorter &&
                      "cursor-pointer select-none transition-colors duration-200 hover:bg-gray-100")
                )}
                style={{ width: column.width }}
                fixed={column.fixed}
                width={column.width}
                onClick={() => handleSortClick(column)}
              >
                <span className="inline-flex items-center">
                  {column.title}
                  {renderSortIcon(column)}
                  {renderFilterDropdown(column)}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Skeleton rows when loading and no data */}
          {paginatedData.length === 0 && isLoading && (
            <>
              {Array.from({
                length: Math.min(
                  5,
                  pagination && typeof pagination === "object"
                    ? pagination.defaultPageSize || 5
                    : 5
                ),
              }).map((_, rIdx) => (
                <TableRow key={`skeleton-${rIdx}`}>
                  {rowSelection && (
                    <TableCell className="w-12">
                      <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                    </TableCell>
                  )}
                  {columns.map((_, cIdx) => (
                    <TableCell
                      key={`skeleton-cell-${rIdx}-${cIdx}`}
                      className={cn(cellPadding[size])}
                    >
                      <div
                        className="h-4 animate-pulse rounded bg-gray-200"
                        style={{
                          width: `${40 + ((cIdx + rIdx * 13) % 50)}%`,
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}

          {/* Empty state when no data and not loading */}
          {paginatedData.length === 0 && !isLoading && (
            <TableRow>
              <TableCell
                className="text-center text-gray-500"
                colSpan={(columns?.length || 0) + (rowSelection ? 1 : 0)}
              >
                No data
              </TableCell>
            </TableRow>
          )}

          {paginatedData.map((record, index) => {
            const rowProps = onRow?.(record, index) || {};
            const rowKey = getRowKey(record, index);
            const isSelected = selectedRowKeys.includes(rowKey);
            const treeRecord = record as T & {
              _level: number;
              _hasChildren: boolean;
            };

            return (
              <TableRow
                key={rowKey}
                className={cn(
                  rowClassName &&
                    (typeof rowClassName === "function"
                      ? rowClassName(record, index)
                      : rowClassName),
                  isSelected && "bg-blue-50",
                  treeRecord._level > 0 && "bg-gray-50/30",
                  rowProps.className
                )}
                {...rowProps}
              >
                {/* Selection checkbox */}
                {rowSelection && (
                  <TableCell className="w-12">
                    {renderSelectionCheckbox(record)}
                  </TableCell>
                )}
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={column.key || column.dataIndex || colIndex}
                    className={cn(
                      cellPadding[size],
                      column.className,
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      colIndex === columns.length - 1 && "border-r-0" // Remove right border for last column
                    )}
                    fixed={column.fixed}
                    width={column.width}
                  >
                    {(() => {
                      const content = column.render
                        ? column.render(
                            column.dataIndex
                              ? record[column.dataIndex]
                              : record,
                            record,
                            index
                          )
                        : column.dataIndex
                          ? record[column.dataIndex]
                          : record[column.key as string];

                      // Inject expand icon in tree first column like Antd
                      const treeIndex = expandable?.treeColumnIndex ?? 0;
                      if (expandable && colIndex === treeIndex) {
                        return (
                          <div
                            className="flex items-center"
                            style={{
                              paddingLeft: `${(expandable?.indentSize ?? 24) * treeRecord._level}px`,
                            }}
                          >
                            <span className="mr-2">
                              {renderExpandIcon(treeRecord)}
                            </span>
                            <span>{content}</span>
                          </div>
                        );
                      }
                      return content;
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Footer */}
      {footer && (
        <div className="mt-4 text-sm text-gray-600">
          {typeof footer === "function" ? footer(paginatedData) : footer}
        </div>
      )}

      {/* Pagination */}
      {pagination !== false && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
          {/* Page Size Selector */}
          {pagination?.showSizeChanger && pagination?.pageSizeOptions && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Show:</span>
              <select
                value={internalPagination.pageSize}
                onChange={e =>
                  handlePaginationChange(1, Number(e.target.value))
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {pagination.pageSizeOptions.map(size => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600"
              onClick={() =>
                handlePaginationChange(
                  internalPagination.current - 1,
                  internalPagination.pageSize
                )
              }
              disabled={internalPagination.current === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page Numbers */}
            {(() => {
              const total = pagination?.total || filteredData.length;
              const totalPages = Math.ceil(total / internalPagination.pageSize);
              const currentPage = internalPagination.current;
              const pages = [];

              // Always show first page
              pages.push(1);

              // Show pages around current page
              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);

              if (start > 2) pages.push("...");
              for (let i = start; i <= end; i++) {
                pages.push(i);
              }
              if (end < totalPages - 1) pages.push("...");
              if (totalPages > 1) pages.push(totalPages);

              return pages.map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-9 w-9 items-center justify-center text-sm font-medium text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                      page === currentPage
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    onClick={() =>
                      handlePaginationChange(
                        page as number,
                        internalPagination.pageSize
                      )
                    }
                  >
                    {page}
                  </button>
                )
              );
            })()}

            {/* Next Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600"
              onClick={() =>
                handlePaginationChange(
                  internalPagination.current + 1,
                  internalPagination.pageSize
                )
              }
              disabled={
                internalPagination.current ===
                Math.ceil(
                  (pagination?.total || filteredData.length) /
                    internalPagination.pageSize
                )
              }
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Legacy components for backward compatibility
const TreeTable = <_T extends Record<string, any> = any>(props: any) => {
  console.warn(
    "TreeTable is deprecated. Use AntTable with expandable prop instead."
  );
  return <AntTable {...props} />;
};

const BasicTable = <_T extends Record<string, any> = any>(props: any) => {
  console.warn("BasicTable is deprecated. Use AntTable instead.");
  return <AntTable {...props} />;
};

export {
  AntTable as Table,
  TreeTable,
  BasicTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};
