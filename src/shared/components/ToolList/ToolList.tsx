import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import { Environment } from "../../environment";
import { Add } from "@mui/icons-material";
import { IToolListProps } from "./types";


export function ToolList({
  textSearch = "",
  viewInputSearch = false,
  alterTextSearch,
  onClickNew,
  textButtonNew = "Novo",
  viewButtonNew = true,
}: IToolListProps) {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      component={Paper}
    >
      {viewInputSearch && (
        <TextField
          size="small"
          value={textSearch}
          placeholder={Environment.INPUT_SEARCH}
          onChange={(e) => alterTextSearch?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {viewButtonNew && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={onClickNew}
            endIcon={<Add />}
          >
            {textButtonNew}
          </Button>
        )}
      </Box>
    </Box>
  );
}
