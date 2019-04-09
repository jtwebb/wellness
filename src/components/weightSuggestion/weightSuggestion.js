import React from 'react';
import { connect } from 'react-redux';
import { Alert, Card, CardBody, CardTitle } from 'reactstrap';

export class WeightSuggestionComponent extends React.PureComponent {
    getLeanBodyMass = () => {
        return ((100 - this.props.bodyFatPercentage) / 100) * this.props.weight;
    };

    renderSuggestion() {
        if (!this.props.bodyFatPercentage || !this.props.weight || !this.props.idealBodyFatPercentage) {
            return (
                <Alert color={`danger`} className={`suggestion-error`}>
                    To calculate this you need to provide your current weight, current body fat percentage and ideal body fat percentage.
                </Alert>
            );
        }

        return (
            <div className={`suggestion-body`}>
                <p>Current lean body mass: {this.getLeanBodyMass().toFixed(2)}</p>
                <p>Current fat mass: {(this.props.weight - this.getLeanBodyMass()).toFixed(2)}</p>
                <p>
                    Maintaining lean body mass your ideal weight for the body fat percentage you provided is:&nbsp;
                    {(this.getLeanBodyMass() / ((100 - this.props.idealBodyFatPercentage) / 100)).toFixed(2)}
                </p>
            </div>
        );
    }

    render = () => {
        return (
            <Card className={`weight-suggestion`}>
                <CardBody>
                    <CardTitle>How much should I weigh?</CardTitle>
                    {this.renderSuggestion()}
                </CardBody>
            </Card>
        );
    };
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
    return {
        bodyFatPercentage: state.user.bodyFatPercentage,
        idealBodyFatPercentage: state.user.idealBodyFatPercentage,
        weight: state.user.weight
    };
};

export default connect(mapStateToProps)(WeightSuggestionComponent);
