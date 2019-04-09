import FormComponent from '../form/form';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import WeightSuggestionComponent from '../weightSuggestion/weightSuggestion';

import './profile.scss';

export class ProfileComponent extends React.PureComponent {
    render() {
        return (
            <Container className={`profile`}>
                <Row>
                    <Col>
                        <WeightSuggestionComponent/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col md={6}>
                                <FormComponent current showTitle allFields/>
                            </Col>
                            <Col md={6}>
                                <FormComponent goal showTitle allFields/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
    return {
        activityFactor: state.user.activityFactor,
        age: state.user.age,
        bodyFatPercentage: state.user.bodyFatPercentage,
        email: state.user.email,
        fatLossPerWeek: state.user.fatLossPerWeek,
        gender: state.user.gender,
        goalDate: state.user.goalDate,
        height: state.user.height,
        idealBodyFatPercentage: state.user.idealBodyFatPercentage,
        idealWeight: state.user.idealWeight,
        lowestCalorieIntake: state.user.lowestCalorieIntake,
        name: state.user.name,
        percentLossPerWeek: state.user.percentLossPerWeek,
        preferredCalculator: state.user.preferredCalculator,
        unitOfMeasure: state.user.unitOfMeasure,
        weight: state.user.weight
    };
};

export default connect(mapStateToProps)(ProfileComponent);
