import React from 'react';
import { Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getForm } from './form';
import userReducer  from '../../redux/userReducer';

import './profile.scss';

export class ProfileComponent extends React.PureComponent {
    updateUser = (key, e) => {
        this.props.updateUserProfile(key, e.target.value);
    };

    /**
     * Renders a field on the form
     *
     * @param field
     * @returns {*}
     */
    renderField = (field) => {
        const {display, key, type, ...extra} = field;

        if (type !== 'select') {
            return (
                <FormGroup key={key}>
                    <Label for={key}>{display}</Label>
                    <Input
                        onChange={this.updateUser.bind(this, key)}
                        type={type}
                        name={key}
                        id={key}
                        placeholder={display}
                        defaultValue={this.props[key]} {...extra}
                    />
                </FormGroup>
            );
        }

        const {options, ...props} = extra;
        return (
            <FormGroup key={key}>
                <Label for={key}>{display}</Label>
                <Input onChange={this.updateUser.bind(this, key)} type={type} name={key} id={key} defaultValue={this.props[key]} {...props}>
                    {options.map((option) => {
                        return <option key={option.value} value={option.value}>{option.display}</option>;
                    })}
                </Input>
            </FormGroup>
        );
    };

    /**
     * Renders the profile form
     *
     * @returns {*}
     */
    renderForm = () => {
        const form = getForm(this.props.unitOfMeasure);

        return form.map((group) => {
            return (
                <Col md={6} key={group.groupName}>
                    <Card>
                        <CardBody>
                            <CardTitle>{group.groupName}</CardTitle>
                            {group.fields.map(this.renderField)}
                        </CardBody>
                    </Card>
                </Col>
            );
        });
    };

    /**
     * Renders the page
     *
     * @returns {*}
     */
    render() {
        return (
            <Container className={`profile`}>
                <Row>
                    <Col>
                        <Form>
                            <Row>
                                {this.renderForm()}
                            </Row>
                        </Form>
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
        exerciseCalories: state.user.exerciseCalories,
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
    return {
        updateUserProfile: (key, value) => {
            return dispatch(userReducer.actions.updateUserProfile({key, value}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
