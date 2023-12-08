import React from "react";
import "./Navbar.css";
import "rsuite/dist/rsuite.min.css";
import { Sidenav, Nav, Toggle } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import ExitIcon from "@rsuite/icons/Exit";
import PlusIcon from "@rsuite/icons/Plus";
import OthersIcon from "@rsuite/icons/Others";
import { useNavigate } from "react-router";

const Navbar = ({ expanded, setExpanded }) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <div>
      <nav className="navbar-container">
        <div>
          <Sidenav
            className="nav-body"
            expanded={expanded}
            defaultOpenKeys={["3", "4"]}
          >
            <Sidenav.Body>
              <Nav activeKey={activeKey} onSelect={setActiveKey}>
                <Nav.Item
                  eventKey="1"
                  onClick={() => navigate("/home")}
                  icon={<DashboardIcon />}
                >
                  Home
                </Nav.Item>
                <Nav.Item
                  eventKey="2"
                  onClick={() => navigate("/Compose")}
                  icon={<PlusIcon />}
                >
                  Compose
                </Nav.Item>
                <Nav.Item
                  eventKey="3"
                  onClick={() => navigate("/explore")}
                  icon={<OthersIcon />}
                >
                  Explore
                </Nav.Item>
                <Nav.Item
                  eventKey="4"
                  onClick={() => navigate("/login")}
                  icon={<ExitIcon />}
                >
                  Logout
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
            <Sidenav.Toggle
              expanded={expanded}
              onToggle={(expanded) => setExpanded(expanded)}
            />
          </Sidenav>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
