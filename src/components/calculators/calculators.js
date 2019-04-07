import React from 'react';
import { connect } from 'react-redux';
import { Input, FormGroup, Label, Col, Container, Row, Collapse, Button } from 'reactstrap';
import ActivityFactorComponent from '../activityFactor/activityFactor';
import FormComponent from '../form/form';
import { IMPERIAL } from '../../redux/userReducer';
import { byGoalDate, byPercentage, poundsPerWeek } from '../../utils/weightLossCalculators';
import CalculatorComponent from './calculator';

import './calculators.scss';

export class CalculatorsComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentInformationIsOpen: false,
            goalInformationIsOpen: true,
            currentCalculator: 'pounds'
        };
    }

    changeCalculator = ({target}) => {
        if (target.value !== this.state.currentCalculator) {
            this.setState({currentCalculator: target.value});
        }
    };

    onCurrentInformationToggle = () => {
        this.setState({currentInformationIsOpen: !this.state.currentInformationIsOpen});
    };

    onGoalInformationToggle = () => {
        this.setState({goalInformationIsOpen: !this.state.goalInformationIsOpen});
    };

    renderForm = () => {
        return ([
            <Button block color={`primary`} onClick={this.onCurrentInformationToggle}>Current Information</Button>,
            <Collapse isOpen={this.state.currentInformationIsOpen}>
                <FormComponent
                    key={`current`}
                    current
                    showTitle={false}
                    showage
                    showheight
                    showweight
                    showbodyFatPercentage
                    showgender
                    showactivityFactor
                />
            </Collapse>,
            <Button block color={`primary`} onClick={this.onGoalInformationToggle}>Goal Information</Button>,
            <Collapse isOpen={this.state.goalInformationIsOpen}>
                <FormComponent
                    key={`goal`}
                    goal
                    showTitle={false}
                    showidealWeight
                    showpercentLossPerWeek={this.state.currentCalculator === 'percentage'}
                    showgoalDate={this.state.currentCalculator === 'goalDate'}
                    showfatLossPerWeek={this.state.currentCalculator === 'pounds'}
                    showlowestCalorieIntake
                />
            </Collapse>
        ]);
    };

    getResults = () => {
        switch (this.state.currentCalculator) {
            case 'percentage':
                return byPercentage(this.props);
            case 'goalDate':
                return byGoalDate(this.props);
            case 'pounds':
            default:
                return poundsPerWeek(this.props);
        }
    };

    render() {
        return (
            <Container fluid className={`calculators-page`}>
                <Row>
                    <Col md={3} lg={2}>
                        <FormGroup>
                            <Label>Calculator</Label>
                            <Input type={`select`} onChange={this.changeCalculator}>
                                <option value={`pounds`}>{this.props.unitOfMeasure === IMPERIAL ? 'Pounds' : 'Kilograms'} Per Week</option>
                                <option value={`goalDate`}>Goal Date</option>
                                <option value={`percentage`}>Percent Per Week</option>
                            </Input>
                        </FormGroup>
                        <ActivityFactorComponent/>
                        {this.renderForm()}
                    </Col>
                    <Col md={9} lg={10}>
                        {
                            <CalculatorComponent
                                calculatorResults={this.getResults()}
                                idealWeight={this.props.idealWeight}
                                unitOfMeasure={this.props.unitOfMeasure}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

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

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorsComponent);
