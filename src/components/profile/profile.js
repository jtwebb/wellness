import FormComponent from '../form/form';
import React, { Fragment } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
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

    onAdd = () => {
        const exercises = [...this.props.exercises];
        exercises.push({activity: this.props.activities[0], duration: 0, daysPerWeek: 1});
        this.props.updateUserProfile('exercises', exercises);
    };

    onRemove = (index) => {
        const exercises = [...this.props.exercises];
        exercises.splice(index, 1);
        this.props.updateUserProfile('exercises', exercises);
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

    onChange = (exercise, index, propName, value) => {
        const exercises = [...this.props.exercises];
        const currentExercise = {...exercises[index]};
        currentExercise[propName] = value;
        exercises[index] = currentExercise;
        this.props.updateUserProfile('exercises', exercises);
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
                    <Row>
                        <Col>
                            <h5>Exercises</h5>
                        </Col>
                    </Row>
                    {this.props.exercises.map((exercise, i) => {
                        return (
                          <ExerciseForm
                            duration={exercise.duration}
                            activity={exercise.activity}
                            daysPerWeek={exercise.daysPerWeek}
                            key={'exercise_form' + i}
                            onRemove={this.onRemove.bind(this, i)}
                            onDurationChange={this.onChange.bind(this, exercise, i, 'duration')}
                            onActivityChange={this.onChange.bind(this, exercise, i, 'activity')}
                            onDaysPerWeekChange={this.onChange.bind(this, exercise, i, 'daysPerWeek')}
                          />
                        );
                    })}
                    <Row className={`exercise-add-row`}>
                        <Col>
                            <Button color={'success'} onClick={this.onAdd}>
                                Add
                            </Button>
                        </Col>
                    </Row>
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
