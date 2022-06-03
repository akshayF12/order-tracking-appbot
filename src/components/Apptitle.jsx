import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Apptitle() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <div className="text-center my-4 title_page">
              <b>Widgets Settings</b>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Apptitle;
