import React from 'react';
import { Alert, Card, CardBody, CardText, CardTitle, Table } from 'reactstrap';
import { IMPERIAL } from '../../redux/userReducer';
import moment from 'moment';

export default class CalculatorComponent extends React.PureComponent {
    render() {
        if (!this.props.calculatorResults || !this.props.calculatorResults.weeks || !this.props.calculatorResults.weeks.length) {
            return <Alert className={`no-data-error`} color={`danger`}>Please enter your data</Alert>;
        }

        const date = moment(Date.now());

        return (
            <div className={`calculator-results`}>
                <Card>
                    <CardBody>
                        <CardTitle>Summary</CardTitle>
                        <CardText>
                            It will take you <strong>{this.props.calculatorResults.weeks.length} weeks</strong>
                            &nbsp;to reach your goal of {this.props.idealWeight} {this.props.unitOfMeasure === IMPERIAL ? 'pounds' : 'kilograms'}.
                        </CardText>
                        {this.props.calculatorResults.averageBmr &&
                        <CardText>
                            Your average BMR across this timeline is <strong>{this.props.calculatorResults.averageBmr.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
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
                    </CardBody>
                </Card>

                <Table responsive borderless striped>
                    <thead>
                        <tr>
                            <th>Week Of</th>
                            <th>Still Need To Burn</th>
                            <th>Weight at End of Week</th>
                            {this.props.calculatorResults.weeks[0].weightLost && <th>Weight Lost</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.calculatorResults.weeks.map((week, i) => {
                            return (
                                <tr key={i}>
                                    <td>{date.add(1, 'w').format('MM-DD-YYYY')}</td>
                                    <td>{week.caloriesToBurn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                    <td>{week.weightAtEndOfWeek.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                    <td>{week.weightLost && week.weightLost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
