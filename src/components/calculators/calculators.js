import ActivityFactorComponent from '../activityFactor/activityFactor';
import CalculatorComponent from './calculator';
import React from 'react';
import SidebarFormComponent from '../form/sidebarForm';
import { byExercise, byGoalDate, byPercentage, poundsPerWeek, byAccuMeasure } from '../../utils/weightLossCalculators';
import { connect } from 'react-redux';
import userReducer, { IMPERIAL } from '../../redux/userReducer';
import { Input, FormGroup, Label, Col, Container, Row } from 'reactstrap';
import AccuMeasureComponent from './accuMeasure';

import './calculators.scss';

export class CalculatorsComponent extends React.PureComponent {
    changeCalculator = ({target}) => {
        if (target.value !== this.props.currentCalculator) {
            this.props.updateUserProfile('currentCalculator', target.value);
        }
    };

    getResults = () => {
        switch (this.props.currentCalculator) {
            case 'percentage':
                return byPercentage(this.props);
            case 'goalDate':
                return byGoalDate(this.props);
            case 'accumeasure':
                return byAccuMeasure(this.props);
            case 'pounds':
                return poundsPerWeek(this.props);
            case 'exercise':
            default:
                return byExercise(this.props);
        }
    };

    render() {
        return (
            <Container fluid className={`calculators-page`}>
                <Row>
                    <Col md={3} lg={2} className={`sidebar`}>
                        <FormGroup>
                            <Label>Calculator</Label>
                            <Input className={`calculator-selector`} defaultValue={this.props.currentCalculator} type={`select`} onChange={this.changeCalculator}>
                                <option value={`pounds`}>{this.props.unitOfMeasure === IMPERIAL ? 'Pounds' : 'Kilograms'} Per Week</option>
                                <option value={`goalDate`}>Goal Date</option>
                                <option value={`percentage`}>Percent Per Week</option>
                                <option value={`exercise`}>Exercise</option>
                                <option value={`accumeasure`}>AccuMeasure</option>
                            </Input>
                        </FormGroup>
                        <ActivityFactorComponent/>
                        <SidebarFormComponent showExercise={this.props.currentCalculator === 'exercise'} goal={{
                            currentOpen: false,
                            showstartDate: true,
                            showpercentLossPerWeek: this.props.currentCalculator === 'percentage',
                            showgoalDate: this.props.currentCalculator === 'goalDate',
                            showfatLossPerWeek: this.props.currentCalculator === 'pounds',
                            showaccumeasure: this.props.currentCalculator === 'accumeasure'
                        }}/>
                    </Col>
                    <Col md={9} lg={10}>
                        {
                            this.props.currentCalculator !== 'accumeasure' && <CalculatorComponent
                                calculatorResults={this.getResults()}
                                idealWeight={this.props.idealWeight}
                                unitOfMeasure={this.props.unitOfMeasure}
                                startDate={this.props.startDate}
                            />
                        }
                        {
                            this.props.currentCalculator === 'accumeasure' && <AccuMeasureComponent
                              gender={this.props.gender}
                              age={this.props.age}
                              idealBodyFatPercentage={this.props.idealBodyFatPercentage}
                              weight={this.props.weight}
                              unitOfMeasure={this.props.unitOfMeasure}
                              startDate={this.props.startDate}
                            />
                        }
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
        currentCalculator: state.user.currentCalculator,
        email: state.user.email,
        exercises: state.user.exercises,
        fatLossPerWeek: state.user.fatLossPerWeek,
        gender: state.user.gender,
        goalDate: state.user.goalDate,
        startDate: state.user.startDate,
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorsComponent);
