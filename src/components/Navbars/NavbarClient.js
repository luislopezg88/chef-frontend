import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const NavbarClient = ({ sideMenu, setSideMenu }) => {
  const [state, setState] = useState({
    collapseClasses: "",
    collapseOpen: false,
  });

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialize
    headroom.init();

    return () => {
      console.log("Desmontar");
    };
  }, []);

  const onExiting = () => {
    setState((prev) => {
      return { ...prev, collapseClasses: "collapsing-out" };
    });
  };

  const onExited = () => {
    setState((prev) => {
      return { ...prev, collapseClasses: "" };
    });
  };

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <h2>
                <em>Cocina</em>
              </h2>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={state.collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>

              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={() => {
                      setSideMenu(!sideMenu);
                    }}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-cloud-download mr-2" />
                    </span>
                    <span className="nav-link-inner--text ml-1">Compras</span>
                  </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavbarClient;
