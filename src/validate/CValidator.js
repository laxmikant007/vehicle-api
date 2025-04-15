import Validator from 'validatorjs';
import _ from "lodash";
import db from '../database/db.js';

const Model = db.SModel;

const hasDuplicates = (arr) => arr.some((e, i, arr) => arr.indexOf(e) !== i);

Validator.registerAsync('distinct', function (columnValue, attribute, req, passes) {
    let grp = _.map(columnValue, 'currency');

    if(hasDuplicates(grp)){
        return passes(false, "Currency should be unique");
    }

    return passes(); 
});

Validator.registerAsync('unique', function (columnValue, attribute, req, passes) {
    const attr = attribute.split(",");  // 0 = tablename , 1 = columnname
    Model.query(`SELECT * FROM ${attr[0]} Where ${attr[1]} = "${columnValue}" LIMIT 1`).then(([results]) => {
        return (results.length == 0) ? passes() : passes(false, `The ${req} has already been taken.`);
    }).catch((error) => {
        return passes(false, error.message)
    });
});

Validator.registerAsync('exists', function (columnValue, attribute, req, passes) {
    const attr = attribute.split(",");  // 0 = tablename , 1 = columnname

    Model.query(`SELECT * FROM ${attr[0]} Where ${attr[1]} = "${columnValue}" LIMIT 1`).then(([results]) => {
        return (results.length == 0) ? passes(false, `The ${req} is not Exists.`) : passes();
    }).catch((error) => {
        return passes(false, error.message)
    });
});

Validator.registerAsync('exists-except', function (columnValue, attribute, req, passes) {
    const attr = attribute.split(",");  // 0 = tablename , 1 = columnname, 2 = expect column, 3 = expect column value
    Model.query(`SELECT * FROM ${attr[0]} Where ${attr[1]} = "${columnValue}" AND ${attr[2]} != ${attr[3]} LIMIT 1`).then(([results]) => {
        return (results.length > 0) ? passes(false, `The ${req} is Already Exists.`) : passes();
    }).catch((error) => {
        return passes(false, error.message)
    });
});

Validator.registerAsync('gte', function (columnValue, attribute, req, passes) {
    if(parseFloat(attribute) > parseFloat(columnValue)){
        return passes(false, `The ${req} should be greater than or equal to ${attribute}`);
    }else{
       return passes();
    } 
});

Validator.registerAsync('gt', function (columnValue, attribute, req, passes) {
    if(parseFloat(attribute) >= parseFloat(columnValue)){
        return passes(false, `The ${req} should be greater than ${attribute}`);
    }else{
       return passes();
    } 
});

Validator.registerAsync('lt', function (columnValue, attribute, req, passes) {
    if(parseFloat(columnValue) > parseFloat(attribute)){
        return passes(false, `The ${req} should be less than ${attribute}`);
    }else{
       return passes();
    } 
});

Validator.registerAsync('object', function (columnValue, attribute, req, passes) {
    if(typeof columnValue === 'object' && columnValue !== null) {
        return passes();
    } else {
        return passes(false, `The ${req} must be an object.`);
    }
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
Validator.register('password_regex', value => passwordRegex.test(value), "Password must contain at least one uppercase letter, one lowercase letter and one number");

const upiRegex = /^[\w.-]+@[\w.-]+$/;
Validator.register('upi_regex', value => upiRegex.test(value), "UPI ID Format is Invalid");

const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
Validator.register('ifsc_regex', value => ifscRegex.test(value), "IFSC Code Format is Invalid");

const dateRegex = /[1-2]\d{3}-(0[1-9]|1[0-2])-(3[0-1]|[1-2]\d|0[1-9])T(0\d|1[0-2])(:[0-5]\d){2}.\d{3}Z/;
Validator.register('date_regex', value => dateRegex.test(value), "Date format is invalid");

const decimalRegex = /^\d+(\.\d{1,8})?$/;
Validator.register('decimal_regex', value => decimalRegex.test(value), "Only allowed 8 decimal");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
Validator.register('email_regex', value => emailRegex.test(value), "Email Format is Invalid");

const numericRegex = /^\d+$/;
Validator.register('numeric_value', value => numericRegex.test(value), "The field must be a number");

const firstError = (validation) => {
    const firstkey = Object.keys(validation.errors.errors)[0];
    return validation.errors.first(firstkey);
}

function validate(request, rules, messages = {}) {
    if (typeof request != 'object' || typeof rules != 'object' || typeof messages != 'object') {
        return {
            status: 0,
            message: 'Invalid Params'
        }
    }

    let validation = new Validator(request, rules, messages);

    return new Promise((resolve, reject) => {
        validation.checkAsync(() => resolve({ status: 1, message: "" }), () => reject({ status: 0, message: firstError(validation) }))
    }).then(r => r).catch(err => err);
}

export default validate;