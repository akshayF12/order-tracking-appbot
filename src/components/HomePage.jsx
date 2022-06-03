import React, { useEffect, useState, Suspense } from "react";
import Apptitle from "./Apptitle";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Settings = React.lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import("./Settings")), 3000)
    )
);

const WidgetView = React.lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import("./widgetView")), 3000)
    )
);

export function HomePage() {
  return (
    <>
      {/* <ProductsCard></ProductsCard> */}
      <Apptitle></Apptitle>
      <Container fluid>
        <Row>
          <Suspense
            fallback={
              <Spinner
                animation="border"
                role="status"
                className="text-center spiner_custom"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
          >
            <Col sm={6}>
              <Settings></Settings>
            </Col>
            <Col sm={6}>
              <WidgetView></WidgetView>
            </Col>
          </Suspense>
        </Row>
      </Container>
    </>
  );
}
