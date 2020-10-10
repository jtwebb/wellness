import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { fetchActivities } from '../../redux/activityReducer';

import './exercise-form.scss';
import userReducer from '../../redux/userReducer';

export class ExerciseForm extends React.PureComponent {
    state = {
        activities: [],
        currentActivity: {}
    };

    componentDidMount = () => {
        if (this.props.activities.length) {
            this.setState({activities: this.props.activities, currentActivity: this.props.activity || this.props.activities[0]});
        } else {
            this.props.getActivities(this.props.activities);
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.activities.length && !this.state.activities.length) {
            this.setState({activities: this.props.activities, currentActivity: this.props.activity || this.props.activities[0]});
        } else if (prevProps.activity !== this.props.activity) {
            this.setState({currentActivity: this.props.activity});
        }
    }

    getCurrentActivity = (exercise) => {
        if (this.props.activities.length) {
            return exercise.activity || this.props.activities[0];
        }
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

    onCopy = (index) => {
        if (index === -1 || index >= this.props.exercises.length) {
            return;
        }

        const exercises = [...this.props.exercises];
        const copiedExercise = {...exercises[index]};
        exercises.splice(index + 1, 0, copiedExercise);
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
        value = value && value.target ? value.target.value : value;
        const exercises = [...this.props.exercises];
        const currentExercise = {...exercises[index]};
        currentExercise[propName] = value;
        exercises[index] = currentExercise;
        this.props.updateUserProfile('exercises', exercises);
    };

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h5>Exercises</h5>
                    </Col>
                </Row>
                {this.props.exercises.map((exercise, i) => {
                    return (
                        <Row className={`exercise-form`} key={`exercise_form_${i}`}>
                            <Col md={6}>
                                <Label>Exercise</Label>
                                <Select
                                  className={`activity-input`}
                                  filterOption={this.filterOption}
                                  isClearable={false}
                                  onChange={this.onChange.bind(this, exercise, i, 'activity')}
                                  options={this.state.activities}
                                  value={this.getCurrentActivity(exercise)}
                                />
                            </Col>
                            <Col md={2}>
                                <Label>Duration (in minutes)</Label>
                                <Input type={`number`} value={exercise.duration}
                                       onChange={this.onChange.bind(this, exercise, i, 'duration')}/>
                            </Col>
                            <Col md={2}>
                                <Label>Days Per Week</Label>
                                <Input type={`number`} value={exercise.daysPerWeek} min={1} max={7}
                                       onChange={this.onChange.bind(this, exercise, i, 'daysPerWeek')}/>
                            </Col>
                            <Col md={2} className={`exercise-form-last-col`}>
                                <Button className={`exercise-form-copy-btn`} color={`primary`} onClick={this.onCopy.bind(this, i)}>Copy</Button>
                                <Button className={`exercise-form-remove-btn`} color={`danger`} onClick={this.onRemove.bind(this, i)}>Remove</Button>
                            </Col>
                        </Row>
                    );
                })}
                <Row className={`exercise-add-row`}>
                    <Col>
                        <Button color={'success'} onClick={this.onAdd}>
                            Add
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.activity.activities,
        exercises: state.user.exercises || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getActivities: (activities) => {
            return dispatch(fetchActivities(activities));
        },
        updateUserProfile: (key, value) => {
            return dispatch(userReducer.actions.updateUserProfile({key, value}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm);
