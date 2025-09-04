import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen]=React.useState(false);
  const [isLoggedIn, setIsLoggedIn]=React.useState(false);
  const navigate = useNavigate();

  React.useEffect(()=>{
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h1" sx={{ my: 2 }}>
        FinLearn
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" sx={{ textAlign: "center" }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        {!isLoggedIn && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login" sx={{ textAlign: "center" }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/signup" sx={{ textAlign: "center" }}>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {isLoggedIn && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ textAlign: "center" }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#003366" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / App Name */}
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            FinLearn
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button component={Link} to="/" sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button component={Link} to="/Stocksdata" sx={{ color: "#fff" }}>
              Stocks
            </Button>
            <Button component={Link} to="/ContactUs" sx={{ color: "#fff" }}>
              ContactUs
            </Button>

            {!isLoggedIn && (
              <>
                <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                  Login
                </Button>
                <Button component={Link} to="/signup" sx={{ color: "#fff" }}>
                  Sign Up
                </Button>
              </>
            )}

            {isLoggedIn && (
              <Button onClick={handleLogout} sx={{ color: "#fff" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
