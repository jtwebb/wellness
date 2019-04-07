import ActivityFactorComponent from '../activityFactor/activityFactor';
import FormComponent from '../form/form';
import React from 'react';
import {
    Alert,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    Table,
    TabPane
} from 'reactstrap';
import { AVERAGE, CUNNINGHAM, HARRIS_BENEDICT, KATCH_MCARDLE, MIFFLIN_ST_JEOR } from '../../redux/userReducer';
import { getAll } from '../../utils/bmrCalculators';
import { connect } from 'react-redux';

import './bmr.scss';

export class BmrComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        };
    }

    changeTab = (tabIndex) => {
        if (this.state.activeTab !== tabIndex) {
            this.setState({activeTab: tabIndex});
        }
    };

    results = () => {
        return getAll(this.props);
    };

    renderCalculatorResults = (calc) => {
        const results = this.results();
        const returnValue = [];
        let currentValue;

        for (let key in results[calc]) {
            if (results[calc].hasOwnProperty(key)) {
                currentValue = results[calc][key];
                returnValue.push((
                    <tr key={currentValue.display} className={key === this.props.activityFactor ? 'table-success' : ''}>
                        <td>{currentValue.display}</td>
                        <td>{currentValue.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                ));
            }
        }

        return returnValue;
    };

    renderResults = () => {
        if (!this.props.age || !this.props.height || !this.props.weight || !this.props.gender || !this.props.activityFactor) {
            return <Alert color={`danger`}>Please enter your data</Alert>;
        }

        const calculators = [AVERAGE, HARRIS_BENEDICT, MIFFLIN_ST_JEOR, KATCH_MCARDLE, CUNNINGHAM];

        return (
            <div>
                <Nav tabs>
                    {calculators.map((calc, i) => {
                        return (
                            <NavItem key={calc} className={this.props.preferredCalculator === calc ? 'success' : ''}>
                                <NavLink className={this.state.activeTab === i ? 'active' : ''} onClick={this.changeTab.bind(this, i)}>
                                    {calc}
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {calculators.map((calc, i) => {
                        if ((calc === KATCH_MCARDLE || calc === CUNNINGHAM) && !this.props.bodyFatPercentage) {
                            return (
                                <TabPane tabId={i}>
                                    <Alert color={`danger`}>Please add body fat percentage to see results for this calculation</Alert>
                                </TabPane>
                            );
                        }

                        return (
                            <TabPane tabId={i} key={calc}>
                                <Table responsive striped borderless>
                                    <thead>
                                        <tr>
                                            <th>Activity Factor</th>
                                            <th>BMR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCalculatorResults(calc)}
                                    </tbody>
                                </Table>
                            </TabPane>
                        );
                    })}
                </TabContent>
            </div>
        );
    };

    render() {
        return (
            <Container fluid className={`bmr-page`}>
                <Row>
                    <Col md={3} lg={2}>
                        <ActivityFactorComponent/>
                        <FormComponent current showTitle showage showheight showweight showbodyFatPercentage showgender showactivityFactor/>
                    </Col>
                    <Col md={9} lg={10}>
                        {this.renderResults()}
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
        gender: state.user.gender,
        height: state.user.height,
        idealBodyFatPercentage: state.user.idealBodyFatPercentage,
        preferredCalculator: state.user.preferredCalculator,
        unitOfMeasure: state.user.unitOfMeasure,
        weight: state.user.weight
    };
};

export default connect(mapStateToProps)(BmrComponent);
