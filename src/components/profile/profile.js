import FormComponent from '../form/form';
import React, { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import WeightSuggestionComponent from '../weightSuggestion/weightSuggestion';
import ExerciseForm from '../form/exerciseForm';
import userReducer from '../../redux/userReducer';
import { fetchActivities } from '../../redux/activityReducer';

import './profile.scss';

export class ProfileComponent extends React.PureComponent {
    componentDidMount = () => {
        this.props.getActivities(this.props.activities);
    };

    render() {
        return (
            <Fragment>
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
                <Container className={`profile-exercises`}>
                    <Row>
                        <Col>
                            <h3>Weekly Exercise Schedule</h3>
                        </Col>
                    </Row>
                    <ExerciseForm/>
                </Container>
            </Fragment>
        );
    }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
    return {
        activities: state.activity.activities,
        activityFactor: state.user.activityFactor,
        age: state.user.age,
        bodyFatPercentage: state.user.bodyFatPercentage,
        email: state.user.email,
        exercises: state.user.exercises || [],
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfile: (key, value) => {
            return dispatch(userReducer.actions.updateUserProfile({key, value}));
        },
        getActivities: (activities) => {
            return dispatch(fetchActivities(activities));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
