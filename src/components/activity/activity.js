import React from 'react';
import SidebarFormComponent from '../form/sidebarForm';
import { Alert, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { convertToKilograms } from '../../utils/conversion';
import { IMPERIAL } from '../../redux/userReducer';

import './activity.scss';

export class ActivityComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            activityCategory: 'All',
            currentActivity: {},
            activities: [],
            duration: 0
        };
    }

    componentDidMount = () => {
        import('../../data/physicalActivities')
            .then((data) => {
                this.setState({
                    categories: [...new Set(['All'].concat(data.activities.map((activity) => {
                        return activity.category;
                    })))],
                    activities: data.activities,
                    currentActivity: data.activities[0]
                });
            });
    };

    getWeight = (weight) => {
        return this.props.unitOfMeasure === IMPERIAL ? convertToKilograms(weight) : weight;
    };

    getCaloriesBurned = (weight) => {
        return (this.state.duration * (this.state.currentActivity.mets * 3.5 * this.getWeight(weight)) / 200).toFixed(2);
    };

    onCategoryChange = ({target}) => {
        const updateActivities = this.state.activities.filter((activity) => {
            if (target.value === 'All') {
                return true;
            }
            return activity.category === target.value;
        });
        this.setState({activityCategory: target.value, activities: updateActivities, currentActivity: updateActivities[0]});
    };

    onActivityChange = ({target}) => {
        this.setState({currentActivity: this.state.activities.find((activity) => {
            return activity.id === target.value;
        })});
    };

    onDurationChange = ({target}) => {
        this.setState({duration: target.value});
    };

    renderResults = () => {
        if (!this.state.currentActivity) {
            return null;
        }

        return (
            <Alert color={`info`}>
                <h4 className={`activity-description`}>{this.state.currentActivity.description}</h4>
                <p>Calories you would burn at your current weight: <strong>{this.getCaloriesBurned(this.props.weight)}</strong></p>
                <p>Calories you would burn at your goal weight: <strong>{this.getCaloriesBurned(this.props.idealWeight)}</strong></p>
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
                                    <Input className={`category-input`} type={`select`} onChange={this.onCategoryChange}>
                                        {this.state.categories.map((category) => {
                                            return <option key={category} value={category}>{category}</option>;
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label>Activity</Label>
                                    <Input className={`activity-input`} type={`select`} onChange={this.onActivityChange}>
                                        {this.state.activities.map((activity) => {
                                            return <option key={activity.id} value={activity.id}>{activity.description}</option>;
                                        })}
                                    </Input>
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
        weight: state.user.weight
    };
};

export default connect(mapStateToProps)(ActivityComponent);
