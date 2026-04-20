import { useQueryClient } from "@tanstack/react-query";
import { AdminService } from "~/services";
import { useMessage } from "~/components/ui/Message";

const LIST_KEY = "/admins";

export const useCreateAdmin = () => {
  const qc = useQueryClient();
  const message = useMessage();
  const { mutateAsync, isPending } = AdminService.usePost<{ success: boolean }>(
    { url: LIST_KEY },
    {
      onSuccess: () => {
        message.success("Created successfully");
        void qc.invalidateQueries({ queryKey: [LIST_KEY] });
      },
    }
  );
  return { createAdmin: mutateAsync, isPending };
};

export const useUpdateAdmin = () => {
  const qc = useQueryClient();
  const message = useMessage();
  const { mutateAsync, isPending } = AdminService.usePut<{ success: boolean }>(
    { url: LIST_KEY },
    {
      onSuccess: () => {
        message.success("Updated successfully");
        void qc.invalidateQueries({ queryKey: [LIST_KEY] });
      },
    }
  );
  return { updateAdmin: mutateAsync, isPending };
};

export const useDeleteAdmin = () => {
  const qc = useQueryClient();
  const message = useMessage();
  const { mutateAsync, isPending } = AdminService.useDelete<{
    success: boolean;
  }>({
    url: LIST_KEY,
  });
  const remove = async (id: string | number) => {
    await mutateAsync(id);
    message.success("Deleted successfully");
    void qc.invalidateQueries({ queryKey: [LIST_KEY] });
  };
  return { deleteAdmin: remove, isPending };
};
