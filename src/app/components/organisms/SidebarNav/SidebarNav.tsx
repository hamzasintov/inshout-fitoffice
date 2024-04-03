"use client";

import Image from "next/image";

import dashboardIcon from "../../../public/dashboardIcon.svg";
import fitHubIcon from "../../../public/fithubIcon.svg";
import copyIcon from "../../../public/copyIcon.svg";
import trackingIcon from "../../../public/trackingIcon.svg";
import workDocs from "../../../public/workDocs.svg";
import logo from "../../../public/logo.svg";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import BreadcrumbNav from "../../molecules/BreadcrumbNav";
import ProfileOptions from "../../molecules/ProfileOptions";

const drawerWidth = 120;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
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
                <Typography
                  sx={{
                    marginTop: "8px",
                    textAlign: "center",
                    fontSize: "11px",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F1F1F1" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
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
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
          <BreadcrumbNav />
          <ProfileOptions userName={"Nisia Ramirez"} />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            "& .MuiDrawer-paperAnchorLeft": {
              backgroundColor: "black",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            "& .MuiDrawer-paperAnchorLeft": {
              backgroundColor: "black",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
