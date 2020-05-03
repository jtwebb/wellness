import React from 'react';
import { Alert, Card, CardBody, CardText, CardTitle, FormGroup, Input, Label } from 'reactstrap';
import { byAccuMeasure } from '../../utils/weightLossCalculators';
import { IMPERIAL } from '../../redux/userReducer';

export default class AccuMeasureComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bodyFatPercentage: 0
    };
  }

  updateAccuMeasure = ({target}) => {
    if (target.value) {
      const bodyFatPercentage = byAccuMeasure(this.props, target.value);
      this.setState({bodyFatPercentage});
    }
  };

  calculateBodyFatPercentageDifference = (ideal, current) => {
    if (ideal < current) {
      return <div>You need to lose <strong>${(current - ideal).toFixed(2)}%</strong> more body fat to reach your goal.</div>;
    }

    if (ideal > current) {
      return <div>You are <strong>${(ideal - current).toFixed(2)}%</strong> past your goal!</div>;
    }

    return <div>You are at your goal!</div>;
  };

  calculateLeanBodyMassAndFatMass = (weight, bodyFat) => {
    const bodyFatWeight = (weight * (bodyFat / 100)).toFixed(2);
    const leanBodyMass = (weight - bodyFatWeight).toFixed(2);
    const idealWeight = (leanBodyMass / ((100 - this.props.idealBodyFatPercentage) / 100)).toFixed(2);
    return {
      leanBodyMass: leanBodyMass + (this.props.unitOfMeasure === IMPERIAL ? ' lbs' : ' kg'),
      bodyFatWeight: bodyFatWeight + (this.props.unitOfMeasure === IMPERIAL ? ' lbs' : ' kg'),
      idealWeight: idealWeight + (this.props.unitOfMeasure === IMPERIAL ? ' lbs' : ' kg')
    };
  };

  render() {
    if (!this.props.gender || !this.props.age) {
      return <Alert className={`no-data-error`} color={`danger`}>Please enter your data</Alert>;
    }

    let bodyComposition = {};

    if (this.props.weight) {
      bodyComposition = this.calculateLeanBodyMassAndFatMass(this.props.weight, this.state.bodyFatPercentage);
    }

    return (
      <div className={`calculator-results accu-measure`}>
        <Card>
          <CardBody>
            <CardTitle>Summary</CardTitle>
            <CardText>
              Your body fat percentage is <strong>{this.state.bodyFatPercentage}</strong>.
            </CardText>
            {this.props.idealBodyFatPercentage && <CardText>
              {this.calculateBodyFatPercentageDifference(this.props.idealBodyFatPercentage, this.state.bodyFatPercentage)}
            </CardText>}
            {bodyComposition.bodyFatWeight && <CardText>Your current body fat is <strong>{bodyComposition.bodyFatWeight}</strong>.</CardText>}
            {bodyComposition.leanBodyMass && <CardText>Your current lean body mass is <strong>{bodyComposition.leanBodyMass}</strong>.</CardText>}
            {bodyComposition.idealWeight && <CardText>
              Based on your  body fat percentage goal, if you kept your lean body mass your ideal weight would be <strong>{bodyComposition.idealWeight}</strong>.
            </CardText>}
          </CardBody>
        </Card>

        <FormGroup>
          <Label>Enter the measurement from the caliper</Label>
          <Input type={`number`} defaultValue={0} onChange={this.updateAccuMeasure}/>
        </FormGroup>
        <div><a href={`https://www.amazon.com/dp/B000G7YW74/ref=cm_sw_em_r_mt_dp_U_upSREbFZEG4SK`} target={`_blank`}>Get the caliper from Amazon</a></div>
      </div>
    );
  }
}
