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
import Tooltip from "@mui/material/Tooltip";
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
import Avatar from "@mui/material/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../components/img/logo-new-draft.png";
import "./dashnav.css";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import crudData from "../config/apiService";

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
  const [studentMenuAnchor, setStudentMenuAnchor] = React.useState(null);
  const [centreMenuAnchor, setCentreMenuAnchor] = React.useState(null);
  const [batchMenuAnchor, setBatchMenuAnchor] = React.useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDashboard = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  const openStudentMenu = (event) => {
    setStudentMenuAnchor(event.currentTarget);
  };

  const openCentreMenu = (event) => {
    setCentreMenuAnchor(event.currentTarget);
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
  };

  const closeCentreMenu = () => {
    setCentreMenuAnchor(null);
    setOpen(false);
  };

  const closeCentreMenu1 = () => {
    setCentreMenuAnchor(null);
    setOpen(false);
    navigate("/add-centres");
  };

  const closeCentreMenu2 = () => {
    setCentreMenuAnchor(null);
    setOpen(false);
    navigate("/view-centres");
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
      await crudData("/logout", "GET", "", "authEngine");

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.message);
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
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open1 ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open1}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                Logout
              </ListItemButton>
            </ListItem>
          </MenuItem>
        </Menu>
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
            <ListItemButton onClick={openCentreMenu}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Centres" />
            </ListItemButton>

            <Menu
              anchorEl={centreMenuAnchor}
              open={Boolean(centreMenuAnchor)}
              onClose={closeCentreMenu}
            >
              <MenuItem onClick={closeCentreMenu1}>New Centre</MenuItem>
              <MenuItem onClick={closeCentreMenu2}>View Centres</MenuItem>
            </Menu>
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
              <MenuItem onClick={closeStudentMenu1}>New Student</MenuItem>
              <MenuItem onClick={closeStudentMenu2}>View Students</MenuItem>
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
              <MenuItem onClick={closeBatchMenu1}>New Batch</MenuItem>
              <MenuItem onClick={closeBatchMenu2}>View Batches</MenuItem>
            </Menu>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph></Typography>
      </Main>
    </Box>
  );
}
