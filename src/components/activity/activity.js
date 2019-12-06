import React from 'react';
import SidebarFormComponent from '../form/sidebarForm';
import { Alert, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { convertToKilograms } from '../../utils/conversion';
import { IMPERIAL } from '../../redux/userReducer';
import Select from 'react-select';
import { fetchActivities } from '../../redux/activityReducer';

import './activity.scss';

export class ActivityComponent extends React.PureComponent {
    activities = [];

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            activityCategory: {value: 'All', label: 'All'},
            currentActivity: {},
            activities: [],
            duration: 0
        };
    }

    componentDidMount = () => {
        this.props.getActivities(this.props.activities);
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.activities && (prevProps.activities !== this.props.activities || prevProps.categories !== this.props.categories)) {
            this.activities = this.props.activities;
            this.setState({
                categories: this.props.categories,
                activities: this.props.activities.sort(this.sortActivities),
                currentActivity: this.props.activities[0]
            });
        }
    };

    sortActivities = (a, b) => {
        return (a.label > b.label) ? 1 : (b.label > a.label) ? -1 : 0;
    };

    getWeight = (weight) => {
        return this.props.unitOfMeasure === IMPERIAL ? convertToKilograms(weight) : weight;
    };

    getCaloriesBurned = (weight) => {
        return (this.state.duration * (this.state.currentActivity.mets * 3.5 * this.getWeight(weight)) / 200).toFixed(2);
    };

    onCategoryChange = (selectedCategory) => {
        const updateActivities = this.activities.filter((activity) => {
            if (selectedCategory.value === 'All') {
                return true;
            }
            return activity.category === selectedCategory.value;
        }).sort(this.sortActivities);

        this.setState({
            activityCategory: selectedCategory,
            activities: updateActivities,
            currentActivity: updateActivities[0]
        });
    };

    onActivityChange = (selectedActivity) => {
        this.setState({currentActivity: this.state.activities.find((activity) => {
            return activity.value === selectedActivity.value;
        })});
    };

    onDurationChange = ({target}) => {
        this.setState({duration: target.value});
    };

    filterOption = (option, input) => {
        const words = input.split(' ');
        return words.reduce((acc, cur) => {
            return acc && option.label.toLowerCase().includes(cur.toLowerCase());
        }, true);
    };

    renderResults = () => {
        if (!this.state.currentActivity) {
            return null;
        }

        const currentWeightCalories = +this.getCaloriesBurned(this.props.weight);
        const idealWeightCalories = +this.getCaloriesBurned(this.props.idealWeight);

        return (
            <Alert color={`info`}>
                <h4 className={`activity-description`}>{this.state.currentActivity.label}</h4>
                <p>Calories you would burn at your current weight: <strong>{currentWeightCalories.toFixed(2)}</strong></p>
                <p>Calories you would burn at your goal weight: <strong>{idealWeightCalories.toFixed(2)}</strong></p>
                <p>Calories you would burn on average: <strong>{((currentWeightCalories + idealWeightCalories) / 2).toFixed(2)}</strong></p>
            </Alert>
        );
    };

    render() {
        return (
            <Container fluid className={`activity-page`}>
                <Row>
                    <Col md={3} lg={2}>
                        <SidebarFormComponent hideGoals/>
                    </Col>
                    <Col md={9} lg={10}>
                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label>Category</Label>
                                    <Select
                                        className={`category-input`}
                                        classNamePrefix={`category-input`}
                                        filterOption={this.filterOption}
                                        isClearable={false}
                                        onChange={this.onCategoryChange}
                                        options={this.state.categories}
                                        value={this.state.activityCategory}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label>Activity</Label>
                                    <Select
                                        className={`activity-input`}
                                        filterOption={this.filterOption}
                                        isClearable={false}
                                        onChange={this.onActivityChange}
                                        options={this.state.activities}
                                        value={this.state.currentActivity}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label>Duration (in minutes)</Label>
                                    <Input className={`duration-input`} type={`number`} step={1} onChange={this.onDurationChange} defaultValue={this.state.duration}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {this.renderResults()}
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
        unitOfMeasure: state.user.unitOfMeasure,
        idealWeight: state.user.idealWeight,
        weight: state.user.weight,
        activities: state.activity.activities,
        categories: state.activity.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getActivities: (activities) => {
            return dispatch(fetchActivities(activities));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityComponent);
