"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { FC } from "react";
import Image from "next/image";

import logo from "../../../public/logo.svg";

import dashboardIcon from "../../../public/dashboardIcon.svg";
import fitHubIcon from "../../../public/fithubIcon.svg";
import copyIcon from "../../../public/copyIcon.svg";
import trackingIcon from "../../../public/trackingIcon.svg";
import workDocs from "../../../public/workDocs.svg";
import BreadcrumbNav from "../components/molecules/BreadcrumbNav";
import ProfileOptions from "../components/molecules/ProfileOptions";

const drawerWidth = 160;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 24px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 24px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - 88px)`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MiniDrawer: FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hoverOpen, setHoverOpen] = React.useState(false);

  const handleHoverOpen = () => {
    if (!open) {
      setHoverOpen(true);
      setOpen(true);
    }
  };

  const handleHoverClose = () => {
    if (hoverOpen) {
      setOpen(false);
      setHoverOpen(false);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listItem = [
    {
      text: "DASHBOARD",
      image: dashboardIcon,
    },
    {
      text: "FIT Hub",
      image: fitHubIcon,
    },
    {
      text: "COPY CENTER REQUEST",
      image: copyIcon,
    },
    {
      text: "TRACKING",
      image: trackingIcon,
    },
    {
      text: "WORK DOCS",
      image: workDocs,
    },
  ];

  const drawer = (
    <Box>
      <Image
        className=" mt-2 pl-2 pr-2"
        src={logo}
        height={44}
        width={146}
        alt="logo"
      />
      <List
        sx={{
          marginTop: "80px",
        }}
      >
        {listItem.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#094DAE",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "16px",
                }}
              >
                <Image
                  src={item.image}
                  height={18}
                  width={18}
                  alt={item.text}
                />
                {open && (
                  <Typography
                    sx={{
                      marginTop: "8px",
                      textAlign: "center",
                      fontSize: "11px",
                    }}
                  >
                    {item.text}
                  </Typography>
                )}
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "#0043A3",
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <BreadcrumbNav />
          <ProfileOptions userName={"Nisia Ramirez"} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        onMouseEnter={handleHoverOpen}
        onMouseLeave={handleHoverClose}
        open={open || hoverOpen}
        sx={{
          zIndex: 100,
          "& .MuiDrawer-paperAnchorLeft": {
            backgroundColor: "black",
            // ":hover": {
            //   width: "160px",
            //   opacity: "96%",
            // },
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MiniDrawer;
