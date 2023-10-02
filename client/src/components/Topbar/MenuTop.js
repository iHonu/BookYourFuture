import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../components/redux/authSlice";
import ModalConfirm from "../Modal/ModalConfirm";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openConfirmDialogue, setOpenConfirmDialogue] = React.useState(false);
  // const isAuth = useSelector(selectorIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = userData?.admin
    ? [
        { path: "/events", label: "Events" },
        { path: "/groups", label: "Groups" },
        { path: "/students", label: "Students" },
      ]
    : [];

  const settings = [
    { label: "Profile", path: `/user/${userData?._id}` },
    { label: "Logout", path: null },
  ];

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {/* Logo Display for Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BYF
          </Typography>

          {/* Nav Links for Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            {navLinks.map((link) => (
              <Typography
                key={link.label}
                variant="body1"
                component={Link}
                to={link.path}
                sx={{
                  marginLeft: 2,
                  marginRight: 2,
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    color: "secondary.dark",
                    textDecoration: "none",
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          {/* Nav Links and Logo for Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.label}
                  component={Link}
                  to={link.path}
                  onClick={handleCloseNavMenu}
                >
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* User Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${userData?.firstName}`}
                  src={userData?.avatarUrl}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  component={setting.path ? Link : "div"}
                  to={setting.path || undefined}
                  onClick={
                    setting.label === "Logout"
                      ? setOpenConfirmDialogue
                      : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                  <ModalConfirm
                    open={openConfirmDialogue}
                    setOpen={setOpenConfirmDialogue}
                    handleConfirm={onClickLogout}
                    content={"Are you sure you want to logout?"}
                    title={"Log out"}
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
