import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { fetchActivities } from '../../redux/activityReducer';

import './exercise-form.scss';

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

    render() {
        return (
            <Row className={`exercise-form`}>
                <Col md={6}>
                    <Label>Exercise</Label>
                    <Select
                        className={`activity-input`}
                        filterOption={this.filterOption}
                        isClearable={false}
                        onChange={this.props.onActivityChange}
                        options={this.state.activities}
                        value={this.state.currentActivity}
                    />
                </Col>
                <Col md={2}>
                    <Label>Duration (in minutes)</Label>
                    <Input type={`number`} value={this.props.duration} onChange={(e) => this.props.onDurationChange(e.target.value)}/>
                </Col>
                <Col md={2}>
                    <Label>Days Per Week</Label>
                    <Input type={`number`} value={this.props.daysPerWeek} min={1} max={7} onChange={(e) => this.props.onDaysPerWeekChange(e.target.value)}/>
                </Col>
                <Col md={2} className={`exercise-form-last-col`}>
                    <Button className={`exercise-form-remove-btn`} color={`danger`} onClick={this.props.onRemove}>Remove</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.activity.activities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getActivities: (activities) => {
            return dispatch(fetchActivities(activities));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm);
