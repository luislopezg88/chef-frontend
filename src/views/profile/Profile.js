import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import NavbarSesion from "components/Navbars/NavbarSesion.js";
//Service
import { API_URL } from "service/config";
//Hook
import { useAuth } from "state/stateAuth";
const Profile = () => {
  const sesion = useAuth();
  const history = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [platos, setPlatos] = useState({ data: [], recordsTotal: 0 });
  const [isLoadingPlato, setIsLoadingPlato] = useState(false);

  const fetchingPlatos = async (id) => {
    setIsLoadingPlato(true);
    try {
      const response = await fetch(`${API_URL}/platos/chef/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setPlatos(json.body);
      } else {
        const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPlato(false);
    }
  };

  const fetching = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/chef/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setData(json.body.data);
        fetchingPlatos(json.body.data._id);
      } else {
        const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sesion?.info?.id) {
      fetching(sesion.info.id);
    }
  }, [sesion]);

  if (isLoading) {
    return (
      <div className="text-center">
        <main className="profile-page">
          <section className="section-profile-cover section-shaped my-0">
            {" "}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </main>
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <>
      <NavbarSesion />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="float-right"
                        color="default"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();

                          history(`/profile-edit/${data?._id ?? 0}`);
                        }}
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();

                          history(`/dashboard`);
                        }}
                        size="sm"
                      >
                        Dashboard
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{platos.recordsTotal}</span>
                        <span className="description">Platos</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {data?.nombre ?? "Sin definir"}
                    <span className="font-weight-light">
                      , {data?.edad ?? 0}
                    </span>
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {data?.ubicacion ?? "Agregar ubicación"}
                  </div>
                  <div className="h6 font-weight-300">
                    {data?.telefono ?? "Agregar teléfono"}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {data?.educacionculinaria ?? "Agregar educacion"}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {data?.experiencialaboral ?? "Agregar experiencia"}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <h2>Platos</h2>

                      <Button
                        className="float-right"
                        color="default"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();

                          history(`/plato-agregar/${data?._id ?? 0}`);
                        }}
                        size="sm"
                      >
                        Agregar
                      </Button>
                    </Col>
                    {isLoadingPlato
                      ? "Cargando..."
                      : platos.data.length === 0
                      ? "Sin registro"
                      : platos.data.map((item, index) => (
                          <Col sm="3" xs="6" key={index}>
                            <small className="d-block text-uppercase font-weight-bold mb-4 mt-4">
                              {item.nombre}
                            </small>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow"
                              src={require("assets/img/theme/comida.jpg")}
                              width={100}
                              height={100}
                              style={{ width: "150px" }}
                            />
                            <small className="d-block text-uppercase font-weight-bold mb-1">
                              <b>{item.descripcion}</b>
                            </small>
                            <small className="d-block text-uppercase font-weight-bold mb-1">
                              <b>Costo:</b>
                              {item.precio}
                            </small>
                          </Col>
                        ))}
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      {/*<SimpleFooter />*/}
    </>
  );
};

export default Profile;
