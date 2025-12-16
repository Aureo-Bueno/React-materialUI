import {
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { Box } from "@mui/system";
import { PropsWithChildren, ReactNode } from "react";
import { useDrawerContext } from "../context";
import { MenuOutlined } from "@mui/icons-material";

interface ILayoutBasePageProps {
  title: string;
  toolBar?: ReactNode;
}

export function LayoutBasePage({
  children,
  title,
  toolBar,
}: PropsWithChildren<ILayoutBasePageProps>) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <MenuOutlined />
          </IconButton>
        )}

        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
        >
          {title}
        </Typography>
      </Box>

      {toolBar && <Box>{toolBar}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
}
