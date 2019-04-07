import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Container, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from 'reactstrap';
import FormComponent from '../form/form';
import ActivityFactorComponent from '../activityFactor/activityFactor';
import { AVERAGE, CUNNINGHAM, HARRIS_BENEDICT, KATCH_MCARDLE, MIFFLIN_ST_JEOR } from '../../redux/userReducer';
import { average, cunningham, harrisBenedict, katchMcardle, mifflinStJeor } from '../../utils/bmrCalculators';

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
        let calculatorsUsed = 2;
        const results = {
            [HARRIS_BENEDICT]: harrisBenedict(this.props.unitOfMeasure, this.props.weight, this.props.height, this.props.age, this.props.gender),
            [MIFFLIN_ST_JEOR]: mifflinStJeor(this.props.unitOfMeasure, this.props.weight, this.props.height, this.props.age, this.props.gender)
        };
        let total = results[HARRIS_BENEDICT].base.value + results[MIFFLIN_ST_JEOR].base.value;

        if (this.props.bodyFatPercentage) {
            calculatorsUsed = 4;
            results[KATCH_MCARDLE] = katchMcardle(this.props.unitOfMeasure, this.props.weight, this.props.bodyFatPercentage);
            results[CUNNINGHAM] = cunningham(this.props.unitOfMeasure, this.props.weight, this.props.bodyFatPercentage);
            total += results[KATCH_MCARDLE].base.value + results[MIFFLIN_ST_JEOR].base.value;
        }

        results[AVERAGE] = average(total, calculatorsUsed);

        return results;
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
                        <FormComponent current showage showheight showweight showbodyFatPercentage showgender showactivityFactor/>
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
        preferredCalculator: state.user.preferredCalculator,
        unitOfMeasure: state.user.unitOfMeasure,
        weight: state.user.weight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BmrComponent);
