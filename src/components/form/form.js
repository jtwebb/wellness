import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import { getForm } from './formData';
import userReducer from '../../redux/userReducer';

export class FormComponent extends React.PureComponent {
    updateUser = (key, e) => {
        this.props.updateUserProfile(key, e.target.value);
    };

    renderField = (field) => {
        const {display, key, type, ...extra} = field;

        if (!this.props.allFields && !this.props[`show${key}`]) {
            return null;
        }

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

    render = () => {
        const form = getForm(this.props.unitOfMeasure);

        return (
            <Form className={`user-form`}>
                {form.map((group) => {
                    if (!this.props.allGroups && !this.props[group.groupId]) {
                        return null;
                    }

                    return (
                        <div className={`group-${group.groupId}`} key={group.groupName}>
                            <Card className={group.groupId}>
                                <CardBody>
                                    {this.props.showTitle && <CardTitle>{group.groupName}</CardTitle>}
                                    {group.fields.map(this.renderField)}
                                </CardBody>
                            </Card>
                        </div>
                    );
                })}
            </Form>
        );
    };
}

/* istanbul ignore next */
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

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfile: (key, value) => {
            return dispatch(userReducer.actions.updateUserProfile({key, value}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
