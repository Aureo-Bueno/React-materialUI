import { TableRow, TableCell, IconButton, Icon } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { ICityTableRowProps } from "./types";

export function CityTableRow({
  city,
  onDelete,
  isDeleting,
}: ICityTableRowProps) {
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    if (confirm("Realmente deseja apagar esta cidade?")) {
      try {
        await onDelete(city.id);
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  }, [city.id, onDelete]);

  const handleEdit = useCallback(() => {
    navigate(`/city/detail/${city.id}`);
  }, [city.id, navigate]);

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
      <TableCell>{city.name}</TableCell>
    </TableRow>
  );
}
