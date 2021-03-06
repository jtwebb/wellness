import React from 'react';
import { Alert, Card, CardBody, CardText, CardTitle, Table } from 'reactstrap';
import { IMPERIAL } from '../../redux/userReducer';
import moment from 'moment';

export default class CalculatorComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            exercisesInformationIsOpen: true
        };
    }

    onExercisesInformationToggle = () => {
        this.setState({exercisesInformationIsOpen: !this.state.exercisesInformationIsOpen});
    };

    render() {
        if (!this.props.calculatorResults || !this.props.calculatorResults.weeks || !this.props.calculatorResults.weeks.length) {
            return <Alert className={`no-data-error`} color={`danger`}>Please enter your data</Alert>;
        }

        const date = this.props.startDate ? moment(this.props.startDate, 'YYYY-MM-DD') : moment(Date.now());
        const endDate = moment(date).add(this.props.calculatorResults.weeks.length, 'w').format('MM-DD-YYYY');

        return (
            <div className={`calculator-results`}>
                <Card>
                    <CardBody>
                        <CardTitle><strong>Summary</strong></CardTitle>
                        {this.props.startDate &&
                        <CardText>Your start date is: <strong>{date.format('MM-DD-YYYY')}</strong></CardText>}
                        <CardText>Your end date is: <strong>{endDate}</strong></CardText>
                        <CardText>
                            It will take you <strong>{this.props.calculatorResults.weeks.length} weeks</strong>
                            &nbsp;to reach your goal of {this.props.idealWeight} {this.props.unitOfMeasure === IMPERIAL ? 'pounds' : 'kilograms'}.
                            &nbsp;({this.props.calculatorResults.weeks.length * 7} days)
                        </CardText>
                        {this.props.calculatorResults.averageBmr &&
                        <CardText>
                            Your average BMR across this timeline is <strong>{this.props.calculatorResults.averageBmr.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
                        </CardText>}
                        {this.props.calculatorResults.averageBurnPerDay &&
                        <CardText>
                            In addition to your activity factor, on average, you need to burn an additional <strong>{this.props.calculatorResults.averageBurnPerDay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            &nbsp;calories</strong> each day.
                        </CardText>}
                        {this.props.calculatorResults.dailyCalorieDeficit &&
                        <CardText>
                            You will need to have an average deficit of <strong>
                            {this.props.calculatorResults.dailyCalorieDeficit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            &nbsp;calories</strong> each day.
                        </CardText>}
                        {this.props.calculatorResults.weightPerWeek &&
                        <CardText>
                            You will end up losing an average of <strong>{this.props.calculatorResults.weightPerWeek.toFixed(2)}
                            &nbsp;{this.props.unitOfMeasure === IMPERIAL ? 'pounds' : 'kilograms'}</strong> per week.
                        </CardText>}
                        {this.props.calculatorResults.caloriesBurnedPerDayExplanation &&
                        <CardText>
                            Calories Burned Per Day includes both exercise and diet calories (based on "Lowest Calories Per Day")
                        </CardText>}
                    </CardBody>
                </Card>

                <Table responsive borderless striped>
                    <thead>
                        <tr>
                            <th>Week Of</th>
                            {this.props.calculatorResults.weeks[0].caloriesToBurn && <th>Still Need To Burn</th>}
                            {this.props.calculatorResults.weeks[0].caloriesBurnedPerDay && <th>Calories Burned Per Day</th>}
                            <th>Weight at Start of Week</th>
                            {this.props.calculatorResults.weeks[0].weightLost && <th>Weight Lost</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.calculatorResults.weeks.map((week, i) => {
                            return (
                                <tr key={i}>
                                    <td>{date.add(1, 'w').format('MM-DD-YYYY')}</td>
                                    {week.caloriesToBurn && <td>{week.caloriesToBurn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>}
                                    {week.caloriesBurnedPerDay && <td>{week.caloriesBurnedPerDay}</td>}
                                    <td>{week.weightAtEndOfWeek.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                    {week.weightLost && <td>{week.weightLost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
