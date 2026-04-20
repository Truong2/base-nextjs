import { useState, useCallback } from "react";

export interface AdminRecord {
  id: string | number;
  name: string;
  email: string;
  role: "admin" | "user";
  permissions?: string[];
  startDate?: string | null;
  isActive?: boolean;
  contactMethod?: "email" | "sms" | "phone";
  department?: string;
  lastLogin?: string;
}

const MOCK_ADMINS: AdminRecord[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    permissions: ["user_management", "content_management"],
    startDate: "2024-01-15",
    isActive: true,
    contactMethod: "email",
    department: "IT",
    lastLogin: "2024-12-15 09:30",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    permissions: ["content_view"],
    startDate: "2024-03-20",
    isActive: true,
    contactMethod: "sms",
    department: "Marketing",
    lastLogin: "2024-12-14 16:45",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "user",
    permissions: ["content_view"],
    startDate: "2024-06-10",
    isActive: false,
    contactMethod: "phone",
    department: "Sales",
    lastLogin: "2024-12-10 11:20",
  },
];

export const useAdmins = () => {
  const [admins, setAdmins] = useState<AdminRecord[]>(MOCK_ADMINS);
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(
    async (data: Omit<AdminRecord, "id">) => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const id = Math.max(0, ...admins.map(a => Number(a.id))) + 1;
      setAdmins(prev => [...prev, { id, ...data }]);
      setIsLoading(false);
    },
    [admins]
  );

  const update = useCallback(async (data: AdminRecord) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setAdmins(prev =>
      prev.map(a => (String(a.id) === String(data.id) ? { ...a, ...data } : a))
    );
    setIsLoading(false);
  }, []);

  const remove = useCallback(async (id: string | number) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setAdmins(prev => prev.filter(a => String(a.id) !== String(id)));
    setIsLoading(false);
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return {
    admins,
    total: admins.length,
    isLoading,
    refetch,
    create,
    update,
    remove,
  };
};
