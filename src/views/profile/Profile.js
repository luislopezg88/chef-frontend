import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
//Service
import { API_URL } from "service/config";
//Hook
import { useAuth } from "state/stateAuth";
const Profile = () => {
  const sesion = useAuth();
  const history = useNavigate();
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

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
  /*
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }*/
  /*
  data?.nombre ,
  data?.sexo,
  data?.foto ,
  data?.disponibilidad ,
  especialidadesculinarias: [],
  habilidadesadicionales: [],
  redessociales: [],
  historialpuntuaciones: [],
 */

  return (
    <>
      <DemoNavbar />
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
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
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
                    {data?.ubicacion ?? "Ubicación"}
                  </div>
                  <div className="h6 font-weight-300">
                    {data?.telefono ?? "0000-000-0000"}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {data?.educacionculinaria ?? "Educacion agregar"}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {data?.experiencialaboral ?? "Experiencia agregar"}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>
                        An artist of considerable range, Ryan — the name taken
                        by Melbourne-raised, Brooklyn-based Nick Murphy —
                        writes, performs and records all of his own music,
                        giving it a warm, intimate feel with a solid groove
                        structure. An artist of considerable range.
                      </p>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Show more
                      </a>
                    </Col>
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
