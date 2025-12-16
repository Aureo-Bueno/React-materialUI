import { TableRow, TableCell, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useCallback } from "react";
import type { IListPerson } from "../../../shared/services/api/person/PersonService";

interface IPersonTableRowProps {
  person: IListPerson;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number) => void;
  isDeleting: boolean;
}

export function PersonTableRow({
  person,
  onDelete,
  onEdit,
  isDeleting,
}: IPersonTableRowProps) {
  const handleDelete = useCallback(async () => {
    if (confirm("Realmente deseja apagar esta pessoa?")) {
      try {
        await onDelete(person.id);
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  }, [person.id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(person.id);
  }, [person.id, onEdit]);

  return (
    <TableRow
      sx={{
        opacity: isDeleting ? 0.5 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <TableCell width="80px">
        <IconButton
          size="small"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Deletar"
          color="error"
        >
          <Delete />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleEdit}
          disabled={isDeleting}
          title="Editar"
          color="primary"
        >
          <Edit />
        </IconButton>
      </TableCell>
      <TableCell>{person.nameComplete}</TableCell>
      <TableCell>{person.email}</TableCell>
    </TableRow>
  );
}
