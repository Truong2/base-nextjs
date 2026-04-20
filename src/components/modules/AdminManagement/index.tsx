"use client";

import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "~/components/ui/Button";
import { ColumnType, Table } from "~/components/ui/Table/table";
import { Modal } from "~/components/ui/Dialog";

import { AdminForm } from "./components/AdminForm";
import { useAdmins } from "./hooks/useAdmins";
import { formatDate, parseDate } from "~/components/ui/Date";

export default function AdminManagement() {
  const { admins, isLoading, refetch, create, update, remove } = useAdmins();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | number | null>(null);

  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        sortable: true,
        width: 150,
      },
      {
        key: "email",
        title: "Email",
        dataIndex: "email",
        sortable: true,
        width: 200,
      },
      {
        key: "role",
        title: "Role",
        dataIndex: "role",
        sortable: true,
        width: 100,
      },
      {
        key: "permissions",
        title: "Permissions",
        dataIndex: "permissions",
        width: 200,
        render: (permissions: string[]) => (
          <div className="flex flex-wrap gap-1">
            {permissions?.map((permission, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
              >
                {permission}
              </span>
            ))}
          </div>
        ),
        align: "left",
      },
      {
        key: "startDate",
        title: "Start Date",
        dataIndex: "startDate",
        width: 150,
        render: (date: string) =>
          date ? formatDate(new Date(date), "DD/MM/YYYY") : "-",
        sortable: true,
      },
      {
        key: "isActive",
        title: "Status",
        dataIndex: "isActive",
        width: 100,
        render: (isActive: boolean) => (
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        ),
        sortable: true,
      },
      {
        key: "contactMethod",
        title: "Contact Method",
        dataIndex: "contactMethod",
        width: 250,
        render: (method: string) => (
          <span className="capitalize">{method || "-"}</span>
        ),
        sortable: true,
      },
      {
        key: "department",
        title: "Department",
        dataIndex: "department",
        width: 120,
        render: (dept: string) => (
          <span className="font-medium text-gray-700">{dept || "General"}</span>
        ),
        sortable: true,
      },
      {
        key: "lastLogin",
        title: "Last Login",
        dataIndex: "lastLogin",
        width: 150,
        render: (date: string) =>
          date ? formatDate(new Date(date), "DD/MM/YYYY HH:mm") : "Never",
        sortable: true,
      },
      {
        key: "actions",
        title: "Actions",
        width: 150,
        fixed: "right",
        render: (_: any, record: any) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="small"
              onClick={() => {
                setEditing({
                  ...record,
                  startDate: record.startDate
                    ? parseDate(record.startDate, "YYYY-MM-DD")
                    : null,
                });
                setOpen(true);
              }}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Editing...
                </>
              ) : (
                "Edit"
              )}
            </Button>
            <Button
              variant="destructive"
              size="small"
              onClick={() => handleDelete(record.id)}
              disabled={deleting === record.id}
            >
              {deleting === record.id ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        ),
        align: "right",
      },
    ],
    [remove, deleting, submitting]
  );

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      if (values.startDate) {
        const date = new Date(values.startDate);
        values.startDate = formatDate(date, "YYYY-MM-DD");
      }
      console.log("values", values);
      if (editing) {
        await update({ id: editing.id, ...values });
      } else {
        await create(values);
      }
      setOpen(false);
      setEditing(null);
      await refetch();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    setDeleting(id);
    try {
      await remove(id);
      await refetch();
    } catch (error) {
      console.error("Error deleting admin:", error);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Admin Management</h2>
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          )}
        </div>
        <Button onClick={handleCreate} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Admin"
          )}
        </Button>
      </div>

      <Modal
        open={open}
        onCancel={() => !submitting && setOpen(false)}
        title={
          editing
            ? submitting
              ? "Editing Admin..."
              : "Edit Admin"
            : submitting
              ? "Creating Admin..."
              : "Create Admin"
        }
        footer={null}
        destroyOnClose
        width={560}
      >
        {submitting ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-gray-400" />
            <p className="text-gray-500">
              {editing ? "Updating admin..." : "Creating admin..."}
            </p>
          </div>
        ) : (
          <AdminForm
            defaultValues={editing ?? undefined}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </Modal>

      {isLoading && admins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-gray-400" />
          <p className="text-gray-500">Loading admin data...</p>
        </div>
      ) : (
        <Table
          dataSource={admins}
          columns={columns}
          bordered
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            current: 1,
            total: admins.length,
            onChange: () => {},
          }}
          loading={isLoading}
          onChange={(pagination: any, filters: any, sorter: any) => {
            console.log("pagination", pagination);
            console.log("filters", filters);
            console.log("sorter", sorter);
          }}
        />
      )}
    </div>
  );
}
