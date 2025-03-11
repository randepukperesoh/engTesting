import { useCallback } from "react";
import { useDebounceCallback } from "./useDebounceCallback";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useEditUser = () => {
  const editUserField = useCallback(
    async (id: string, field: string, value: string) => {
      const data = new FormData();
      data.append("user_id", id);
      data.append("col", field);
      data.append("data", value);
      try {
        const response = await fetch(
          api+ "/main/admin/users/api/UpdateUserByCol",
          { method: "post", credentials: "include", body: data }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();

        toast.success('Данные пользователя изменены')

        return res;
      } catch (error) {
        console.error("Error updating user field:", error);
      }
    },
    []
  );

  const handleEditSecondName = useDebounceCallback(
    (id: string, value: string) => editUserField(id, "last_name", value),
    500
  );

  const handleEditFirstName = useDebounceCallback(
    (id: string, value: string) => editUserField(id, "first_name", value),
    500
  );

  const handleEditOtherName = useDebounceCallback(
    (id: string, value: string) => editUserField(id, "other_name", value),
    500
  );

  const handleEditLogin = useDebounceCallback(
    (id: string, value: string) => editUserField(id, "login", value),
    500
  );

  const handleEditActive = useDebounceCallback(
    (id: string, value: boolean) =>
      editUserField(id, "is_active", value ? "true" : "false"),
    500
  );

  const handleEditAdmin = useDebounceCallback(
    (id: string, value: boolean) =>
      editUserField(id, "is_admin", value ? "true" : "false"),
    500
  );

  return {
    handleEditSecondName,
    handleEditFirstName,
    handleEditOtherName,
    handleEditLogin,
    handleEditActive,
    handleEditAdmin,
  };
};
