import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table, ColumnType } from "./table";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for basic table
const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    tags: ["cool"],
  },
  {
    key: "5",
    name: "Jake White",
    age: 28,
    address: "Dublin No. 2 Lake Park",
    tags: ["nice"],
  },
  {
    key: "6",
    name: "Disabled User",
    age: 35,
    address: "Disabled Address",
    tags: ["disabled"],
  },
];

// Tree data structure
const treeData = [
  {
    key: "1",
    name: "Engineering",
    type: "Department",
    members: 25,
    children: [
      {
        key: "1-1",
        name: "Frontend Team",
        type: "Team",
        members: 8,
        children: [
          { key: "1-1-1", name: "React Developers", type: "Group", members: 4 },
          { key: "1-1-2", name: "Vue Developers", type: "Group", members: 4 },
        ],
      },
      {
        key: "1-2",
        name: "Backend Team",
        type: "Team",
        members: 12,
        children: [
          { key: "1-2-1", name: "API Team", type: "Group", members: 6 },
          { key: "1-2-2", name: "Database Team", type: "Group", members: 6 },
        ],
      },
      {
        key: "1-3",
        name: "DevOps Team",
        type: "Team",
        members: 5,
        children: [
          { key: "1-3-1", name: "Infrastructure", type: "Group", members: 3 },
          { key: "1-3-2", name: "CI/CD", type: "Group", members: 2 },
        ],
      },
    ],
  },
  {
    key: "2",
    name: "Marketing",
    type: "Department",
    members: 15,
    children: [
      {
        key: "2-1",
        name: "Digital Marketing",
        type: "Team",
        members: 8,
        children: [
          { key: "2-1-1", name: "SEO Team", type: "Group", members: 4 },
          { key: "2-1-2", name: "Social Media", type: "Group", members: 4 },
        ],
      },
      {
        key: "2-2",
        name: "Content Team",
        type: "Team",
        members: 7,
        children: [
          { key: "2-2-1", name: "Writers", type: "Group", members: 4 },
          { key: "2-2-2", name: "Designers", type: "Group", members: 3 },
        ],
      },
    ],
  },
];

// Basic columns configuration
const columns: ColumnType<(typeof dataSource)[0]>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: value => <a>{value}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags: string[]) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <span
              key={tag}
              className={`mr-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                color === "volcano"
                  ? "bg-red-100 text-red-800"
                  : color === "geekblue"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {tag.toUpperCase()}
            </span>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="space-x-2">
        <button className="text-blue-600 hover:text-blue-800">
          Invite {record.name}
        </button>
        <button className="text-red-600 hover:text-red-800">Delete</button>
      </div>
    ),
  },
];

// Tree table columns
const treeColumns: ColumnType<(typeof treeData)[0]>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: "20%",
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
    align: "center",
  },
  {
    title: "Actions",
    key: "actions",
    width: "20%",
    align: "center",
    render: (_, _record) => (
      <div className="flex gap-1">
        <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">
          Edit
        </button>
        <button className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200">
          Del
        </button>
      </div>
    ),
  },
];

// Sortable columns
const sortableColumns: ColumnType<(typeof dataSource)[0]>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: value => <a>{value}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags: string[]) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <span
              key={tag}
              className={`mr-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                color === "volcano"
                  ? "bg-red-100 text-red-800"
                  : color === "geekblue"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {tag.toUpperCase()}
            </span>
          );
        })}
      </>
    ),
  },
];

// 1. Basic Table Story
export const BasicTable: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <h3 className="mb-4 text-lg font-semibold">Basic Table</h3>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  ),
};

// 2. Tree Table Story
export const TreeTable: Story = {
  render: () => {
    const TreeTableComponent = () => {
      const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([
        "1",
        "2",
      ]);

      return (
        <div className="w-full max-w-4xl">
          <h3 className="mb-4 text-lg font-semibold">Tree Table</h3>
          <Table
            dataSource={treeData}
            columns={treeColumns}
            expandable={{
              expandedRowKeys,
              onExpandedRowsChange: setExpandedRowKeys,
              expandRowByClick: true,
            }}
            bordered
          />
        </div>
      );
    };

    return <TreeTableComponent />;
  },
};

// 2.1. Tree Table with Selection Story
export const TreeTableWithSelection: Story = {
  render: () => {
    const TreeTableWithSelectionComponent = () => {
      const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([
        "1",
        "2",
      ]);
      const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

      const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: any[]) => {
          console.log("Selected tree rows:", selectedRows);
          setSelectedRowKeys(newSelectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.type === "Group",
          name: record.name,
        }),
      };

      return (
        <div className="w-full max-w-4xl">
          <h3 className="mb-4 text-lg font-semibold">
            Tree Table with Selection
          </h3>
          <div className="mb-4 text-sm text-gray-600">
            Selected: {selectedRowKeys.length} items
          </div>
          <Table
            dataSource={treeData}
            columns={treeColumns}
            expandable={{
              expandedRowKeys,
              onExpandedRowsChange: setExpandedRowKeys,
              expandRowByClick: true,
            }}
            rowSelection={rowSelection}
            bordered
          />
        </div>
      );
    };

    return <TreeTableWithSelectionComponent />;
  },
};

// 3. Table with Sorting Story
export const TableWithSorting: Story = {
  render: () => {
    const TableWithSortingComponent = () => {
      const [sorter, setSorter] = useState<any>({});

      return (
        <div className="w-full max-w-4xl">
          <h3 className="mb-4 text-lg font-semibold">Table with Sorting</h3>
          <Table
            dataSource={dataSource}
            columns={sortableColumns}
            onChange={(_pagination, _filters, sorter) => {
              setSorter(sorter);
            }}
          />
          {sorter.field && (
            <div className="mt-4 text-sm text-gray-600">
              Current sort: {sorter.field} ({sorter.order})
            </div>
          )}
        </div>
      );
    };

    return <TableWithSortingComponent />;
  },
};

// 4. Table with Selection Story
export const TableWithSelection: Story = {
  render: () => {
    const TableWithSelectionComponent = () => {
      const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

      const rowSelection = {
        selectedRowKeys,
        type: "checkbox" as const,
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: any[]) => {
          console.log("Selected rows:", selectedRows);
          setSelectedRowKeys(newSelectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.name === "Disabled User",
          name: record.name,
        }),
      };

      return (
        <div className="w-full max-w-4xl">
          <h3 className="mb-4 text-lg font-semibold">Table with Selection</h3>
          <div className="mb-4 text-sm text-gray-600">
            Selected: {selectedRowKeys.length} items
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={rowSelection}
            bordered
          />
        </div>
      );
    };

    return <TableWithSelectionComponent />;
  },
};

// 5. Table with Pagination Story
export const TableWithPagination: Story = {
  render: () => {
    const TableWithPaginationComponent = () => {
      const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: dataSource.length,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
        showTotal: (total: number, range: [number, number]) =>
          `${range[0]}-${range[1]} of ${total} items`,
      });

      return (
        <div className="w-full max-w-4xl">
          <h3 className="mb-4 text-lg font-semibold">Table with Pagination</h3>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            onChange={(pagination, filters, sorter) => {
              console.log("Table changed:", { pagination, filters, sorter });
              setPagination(prev => ({ ...prev, ...pagination }));
            }}
          />
        </div>
      );
    };

    return <TableWithPaginationComponent />;
  },
};

// 6. Combined Table Story (Sorting + Selection + Pagination)
export const CombinedTable: Story = {
  render: () => {
    const CombinedTableComponent = () => {
      const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
      const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: dataSource.length,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
      });

      const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[], _selectedRows: any[]) => {
          setSelectedRowKeys(newSelectedRowKeys);
        },
      };

      return (
        <div className="w-full max-w-4xl">
          <h3 className="mb-4 text-lg font-semibold">
            Combined Table (Sorting + Selection + Pagination)
          </h3>
          <div className="mb-4 text-sm text-gray-600">
            Selected: {selectedRowKeys.length} items
          </div>
          <Table
            dataSource={dataSource}
            columns={sortableColumns}
            rowSelection={rowSelection}
            pagination={pagination}
            onChange={(pagination, filters, sorter) => {
              console.log("Table changed:", { pagination, filters, sorter });
              setPagination(prev => ({ ...prev, ...pagination }));
            }}
            bordered
          />
        </div>
      );
    };

    return <CombinedTableComponent />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small Size</h3>
        <Table dataSource={dataSource} columns={columns} size="small" />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Middle Size (Default)</h3>
        <Table dataSource={dataSource} columns={columns} size="middle" />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Large Size</h3>
        <Table dataSource={dataSource} columns={columns} size="large" />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table
        dataSource={[]}
        columns={columns}
        loading={true}
        pagination={false}
      />
    </div>
  ),
};

export const CustomRowStyling: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={(_record, index) => {
          if (index % 2 === 0) return "bg-gray-50";
          return "";
        }}
        onRow={(record, index) => ({
          onClick: () => {
            console.log("Row clicked:", record, index);
          },
        })}
      />
    </div>
  ),
};

export const LegacyBasicTable: Story = {
  render: () => {
    const LegacyBasicTableComponent = () => {
      const [page, setPage] = useState(1);
      const [_sortKey, setSortKey] = useState<string | null>(null);
      const [_sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

      return (
        <div className="w-full max-w-4xl">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
              current: page,
              pageSize: 10,
              total: dataSource.length,
              onChange: page => setPage(page),
            }}
            onChange={(_pagination, _filters, sorter) => {
              if (sorter.field) {
                setSortKey(sorter.field);
                setSortOrder(sorter.order || null);
              } else {
                setSortKey(null);
                setSortOrder(null);
              }
            }}
          />
        </div>
      );
    };

    return <LegacyBasicTableComponent />;
  },
};

export const TableWithFilter: Story = {
  render: () => {
    const TableWithFilterComponent = () => {
      const columns: ColumnType<(typeof dataSource)[0]>[] = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: true,
          filters: [
            { text: "John", value: "John" },
            { text: "Jim", value: "Jim" },
            { text: "Joe", value: "Joe" },
            { text: "Jake", value: "Jake" },
          ],
          onFilter: (value, record) => record.name.includes(value as string),
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          sorter: true,
          filters: [
            { text: "20-30", value: "20-30" },
            { text: "30-40", value: "30-40" },
            { text: "40+", value: "40+" },
          ],
          onFilter: (value, record) => {
            if (value === "20-30") return record.age >= 20 && record.age <= 30;
            if (value === "30-40") return record.age >= 30 && record.age <= 40;
            if (value === "40+") return record.age >= 40;
            return true;
          },
        },
        {
          title: "Tags",
          dataIndex: "tags",
          key: "tags",
          filters: [
            { text: "nice", value: "nice" },
            { text: "cool", value: "cool" },
            { text: "developer", value: "developer" },
            { text: "teacher", value: "teacher" },
            { text: "loser", value: "loser" },
          ],
          onFilter: (value, record) => record.tags.includes(value as string),
          render: (tags: string[]) => (
            <div className="flex gap-1">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          ),
        },
      ];

      return (
        <Table
          dataSource={dataSource}
          columns={columns}
          onChange={(pagination, filters, sorter) => {
            console.log("Table with filter changed:", {
              pagination,
              filters,
              sorter,
            });
          }}
        />
      );
    };

    return <TableWithFilterComponent />;
  },
};

export const TableWithRadioSelection: Story = {
  render: () => {
    const TableWithRadioSelectionComponent = () => {
      const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

      const rowSelection = {
        selectedRowKeys,
        type: "radio" as const,
        onChange: (newSelectedRowKeys: React.Key[], _selectedRows: any[]) => {
          setSelectedRowKeys(newSelectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.name === "Disabled User",
          name: record.name,
        }),
      };

      return (
        <div className="w-full max-w-4xl">
          <h3 className="mb-4 text-lg font-semibold">
            Table with Radio Selection
          </h3>
          <div className="mb-4 text-sm text-gray-600">
            Selected: {selectedRowKeys.length} item
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={rowSelection}
            bordered
          />
        </div>
      );
    };

    return <TableWithRadioSelectionComponent />;
  },
};
