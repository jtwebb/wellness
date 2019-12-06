import FormComponent from '../form/form';
import React, { Fragment } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import WeightSuggestionComponent from '../weightSuggestion/weightSuggestion';
import ExerciseForm from '../form/exerciseForm';

import './profile.scss';
import userReducer from '../../redux/userReducer';
import { fetchActivities } from '../../redux/activityReducer';

export class ProfileComponent extends React.PureComponent {
    componentDidMount = () => {
        this.props.getActivities(this.props.activities);
    };

    onAdd = (workout, index) => {
        const workouts = [...this.props.workouts];
        workout = {...workout};
        const exercises = [...workout.exercises];
        exercises.push({activity: this.props.activities[0], duration: 0});
        workout.exercises = exercises;
        workouts[index] = workout;
        this.props.updateUserProfile('workouts', workouts);
    };

    onRemove = (workout, index, exerciseIndex) => {
        const workouts = [...this.props.workouts];
        workout = {...workout};
        const exercises = [...workout.exercises];
        exercises.splice(exerciseIndex, 1);
        workout.exercises = exercises;
        workouts[index] = workout;
        this.props.updateUserProfile('workouts', workouts);
    };

    onDurationChange = (workout, index, exerciseIndex, value) => {
        const workouts = [...this.props.workouts];
        workout = {...workout};
        const exercises = [...workout.exercises];
        const exercise = {...exercises[exerciseIndex]};
        exercise.duration = value;
        exercises[exerciseIndex] = exercise;
        workout.exercises = exercises;
        workouts[index] = workout;
        this.props.updateUserProfile('workouts', workouts);
    };

    onActivityChange = (workout, index, exerciseIndex, value) => {
        const workouts = [...this.props.workouts];
        workout = {...workout};
        const exercises = [...workout.exercises];
        const exercise = {...exercises[exerciseIndex]};
        exercise.activity = value;
        exercises[exerciseIndex] = exercise;
        workout.exercises = exercises;
        workouts[index] = workout;
        this.props.updateUserProfile('workouts', workouts);
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
                    {this.props.workouts.map((workout, i) => {
                        return (
                            <Fragment key={'workout_fragment' + i}>
                                <Row>
                                    <Col>
                                        <h5>{workout.title}</h5>
                                    </Col>
                                </Row>
                                {workout.exercises.map((exercise, j) => {
                                    return (
                                        <ExerciseForm
                                            duration={exercise.duration}
                                            activity={exercise.activity}
                                            key={'exercise_form' + j}
                                            onRemove={this.onRemove.bind(this, workout, i, j)}
                                            onDurationChange={this.onDurationChange.bind(this, workout, i, j)}
                                            onActivityChange={this.onActivityChange.bind(this, workout, i, j)}
                                        />
                                    );
                                })}
                                <Row className={`exercise-add-row`}>
                                    <Col>
                                        <Button color={'success'} onClick={this.onAdd.bind(this, workout, i)}>
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                            </Fragment>
                        );
                    })}
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
        weight: state.user.weight,
        workouts: state.user.workouts || [
            { title: 'Monday', exercises: [] },
            { title: 'Tuesday', exercises: [] },
            { title: 'Wednesday', exercises: [] },
            { title: 'Thursday', exercises: [] },
            { title: 'Friday', exercises: [] },
            { title: 'Saturday', exercises: [] },
            { title: 'Sunday', exercises: [] }
        ]
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
