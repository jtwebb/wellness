import React, { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';

export default class DisclaimerComponent extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Container className={`profile`}>
          <Row>
            <Col>
              <h3>Disclaimer</h3>
              <p>These tools were created for my personal use. I do not guarantee accuracy. I also do not take responsibility for decisions made based off the results of these tools. Use at your own risk.</p>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
