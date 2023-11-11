import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormGroup,
  Input,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
//Service
import { API_URL } from "service/config";
//Hook
import { useAuth } from "state/stateAuth";

const initial = {
  _id: "",
  id_user: "",
  nombre: "",
  sexo: "",
  edad: "",
  foto: "",
  telefono: "",
  ubicacion: "",
  experiencialaboral: "",
  educacionculinaria: "",
  disponibilidad: "",
  especialidadesculinarias: [],
  habilidadesadicionales: [],
  redessociales: [],
  historialpuntuaciones: [],
};

const ProfileEdit = () => {
  const sesion = useAuth();
  const [form, setForm] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetching = async (id) => {
    if (id === 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/chef/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setForm(json.body.data);
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
    if (sesion.info.id) {
      fetching(sesion.info.id ?? 0);
    }
  }, [sesion]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeMulti = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/chef/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      if (response.ok) {
        const json = await response.json();
      } else {
        const json = await response.json();
        setError(json?.body?.error ?? "Error solicitud");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setForm(initial);
    }
  };

  const catEspecialidades = [
    { label: "Cocina Francesa", value: "1" },
    { label: "Cocina Italiana", value: "2" },
    { label: "Cocina Asiática", value: "3" },
    { label: "Cocina Mexicana", value: "4" },
    { label: "Cocina Mediterránea", value: "5" },
    { label: "Cocina Vegetariana", value: "6" },
    { label: "Cocina Vegana", value: "7" },
    { label: "Cocina de Fusión", value: "8" },
    { label: "Cocina de Autor", value: "9" },
    { label: "Cocina Molecular", value: "10" },
    { label: "Parrilla/Asados", value: "11" },
    { label: "Repostería", value: "12" },
    { label: "Sushi", value: "13" },
    { label: "Tapas", value: "14" },
    { label: "Comida Étnica", value: "15" },
  ];

  const catAdicionales = [
    { label: "Gestión de Inventarios", value: "1" },
    { label: "Planificación de Menús", value: "2" },
    { label: "Normativas Sanitarias", value: "3" },
    { label: "Presentación de Platos", value: "4" },
    { label: "Creatividad Culinaria", value: "5" },
    { label: "Manejo de Utensilios Específicos", value: "6" },
    { label: "Dominio de Técnicas de Cocina", value: "7" },
    { label: "Trabajo en Equipo", value: "8" },
    { label: "Comunicación con el Cliente", value: "9" },
    { label: "Gestión del Tiempo", value: "10" },
    { label: "Negociación con Proveedores", value: "11" },
    { label: "Enología", value: "12" },
    { label: "Experiencia en Catering", value: "13" },
    { label: "Cocina Saludable", value: "14" },
    { label: "Capacidades Multitarea", value: "15" },
  ];

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
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        volver
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">0</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">0</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">0</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {form?.nombre ?? ""}
                    <span className="font-weight-light mr-1 ml-1">
                      /{form?.edad ?? ""}
                    </span>
                  </h3>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <Form role="form" onSubmit={handleSubmit}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Nombre"
                              name="nombre"
                              type="text"
                              value={form.nombre}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Teléfono"
                              name="telefono"
                              type="text"
                              value={form.telefono}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Edad"
                              name="edad"
                              type="text"
                              value={form.edad}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Dirección"
                              name="ubicacion"
                              type="text"
                              value={form.ubicacion}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Experiencia laboraral"
                              name="experiencialaboral"
                              type="textarea"
                              value={form.experiencialaboral}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Educacion culinaria"
                              name="educacionculinaria"
                              type="textarea"
                              value={form.educacionculinaria}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="exampleSelect"
                              type="select"
                              placeholder="Genero"
                              name="sexo"
                              value={form.sexo}
                              onChange={handleChange}
                            >
                              <option value="masculino">Masculino</option>
                              <option value="femenino">Femenino</option>
                              <option value="otro">otro</option>
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="select"
                              placeholder="Especialidades culinarias"
                              name="especialidadesculinarias"
                              value={form.especialidadesculinarias}
                              onChange={handleChangeMulti}
                              multiple
                            >
                              {catEspecialidades.map((item) => (
                                <option value={item.value}>{item.label}</option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="select"
                              placeholder="Especialidades culinarias"
                              name="habilidadesadicionales"
                              value={form.habilidadesadicionales}
                              onChange={handleChangeMulti}
                              multiple
                            >
                              {catAdicionales.map((item) => (
                                <option value={item.value}>{item.label}</option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        {/*
  disponibilidad: "",
  especialidadesculinarias: [],
  habilidadesadicionales: [],
  redessociales: [],
  historialpuntuaciones: [],
*/}
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Guardar
                          </Button>
                        </div>
                      </Form>
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

export default ProfileEdit;
