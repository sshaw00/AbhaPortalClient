import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../components/img/logo-new-draft.png";
import "./dashnav.css";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { onLogout } from "../api/auth";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const [studentMenuAnchor, setStudentMenuAnchor] = useState(null);
  const [batchMenuAnchor, setBatchMenuAnchor] = useState(null);
  const navigate = useNavigate();

  const openDashboard = (event) => {
    setOpen(false);
    navigate("/dashboard");
  };

  const openStudentMenu = (event) => {
    setStudentMenuAnchor(event.currentTarget);
  };

  const closeStudentMenu1 = () => {
    setStudentMenuAnchor(null);
    setOpen(false);
    navigate("/add-students");
  };

  const closeStudentMenu2 = () => {
    setStudentMenuAnchor(null);
    setOpen(false);
    navigate("/view-students");
  };
  const closeStudentMenu = () => {
    setStudentMenuAnchor(null);
    setOpen(false);
    // navigate("/view-students");
  };

  const closeStudentMenu3 = () => {
    setStudentMenuAnchor(null);
    setOpen(false);
    // navigate("/view-students");
  };
  const openBatchMenu = (event) => {
    setBatchMenuAnchor(event.currentTarget);
  };

  const closeBatchMenu1 = () => {
    setBatchMenuAnchor(null);
    setOpen(false);
    navigate("/add-batches");
  };

  const closeBatchMenu2 = () => {
    setBatchMenuAnchor(null);
    setOpen(false);
    navigate("/view-batches");
  };

  const closeBatchMenu = () => {
    setBatchMenuAnchor(null);
    setOpen(false);
  };

  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} className="img" alt="Background-Pic" />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List>
          {["Dashboard", "Logout", "Students", "Batches"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <DashboardIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    text === "Logout" ? (
                      <Button variant="text" onClick={logout}>
                        Logout
                      </Button>
                    ) : (
                      <Button variant="text">{text}</Button>
                    )
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" onClick={openDashboard} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={openStudentMenu}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItemButton>

            <Menu
              anchorEl={studentMenuAnchor}
              open={Boolean(studentMenuAnchor)}
              onClose={closeStudentMenu}
            >
              {/* Add your dropdown menu items for students */}
              <MenuItem onClick={closeStudentMenu1}>New Student</MenuItem>
              <MenuItem onClick={closeStudentMenu2}>View Students</MenuItem>
              {/* <MenuItem onClick={closeStudentMenu3}>Upload DOcuments</MenuItem> */}
            </Menu>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={openBatchMenu}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Batches" />
            </ListItemButton>
            <Menu
              anchorEl={batchMenuAnchor}
              open={Boolean(batchMenuAnchor)}
              onClose={closeBatchMenu}
            >
              {/* Add your dropdown menu items for batches */}
              <MenuItem onClick={closeBatchMenu1}>New Batch</MenuItem>
              <MenuItem onClick={closeBatchMenu2}>View Batches</MenuItem>
              {/* <MenuItem onClick={closeBatchMenu}>Enroll Students</MenuItem> */}
            </Menu>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* <List>
          {[].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph></Typography>
      </Main>
    </Box>
  );
}
