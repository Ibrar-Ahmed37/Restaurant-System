import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem,
    Button,  Label, Col,Row } from 'reactstrap';
import {actions,Form,Errors,Control} from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class  Contact extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(values)
    {
        console.log("state is "+ JSON.stringify(values));
        alert("state is "+ JSON.stringify(values));
        this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message);
        this.props.resetFeedBackForm();
       // event.preventDefault();
    }
   
    render()
    {
         return(
        
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                   <div className="col-12">
                      <h3>Send us your Feedback</h3>
                   </div>
                <div className="col-12 col-md-12">    
                    <Form model="feedback" onSubmit={(values)=> this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label md={2} htmlFor="firstname" >
                                    First Name
                            </Label>
                            <Col md={8}>
                                    <Control.text model=".firstname"   id="firstname" name="firstname"
                                        placeholder="First Name"
                                      className="form-control"
                                      validators={{
                                          required,minLength:minLength(3),maxLength:maxLength(10)
                                      }}
                                      />
                                    <Errors 
                                    className="text-danger"
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required:'Required',
                                        minLength:'Must be >=3',
                                        maxLength:'Must be less than 10'
                                    }}
                                    />
                            </Col>       
                        </Row>
                        <Row className="form-group">
                            <Label htmlfor md={2}>
                                Last Name
                            </Label>
                            <Col md={8}>
                                <Control.text model=".lastname" name="lastname" id="lastname" 
                                placeholder="last Name"
                                className="form-control" 
                                validators={{
                                    required,minLength:minLength(3),maxLength:maxLength(10)
                                }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".lastname"
                                    show="touched"
                                    messages={{
                                        required:'Required',
                                        minLength:'Must be >=3',
                                        maxLength:'Must be less than 10'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" className="form-control" id="telnum" name="telnum"
                                        placeholder="Tel. number"
                                        validators={{
                                            required,minLength:minLength(3),maxLength:maxLength(15),
                                            isNumber
                                        }} />
                                        <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required:'Required',
                                            minLength:"must be>=3",
                                            maxLength:'Must be less than 15',
                                            isNumber:'Must be a number'
                                        }}
                                        />
                                </Col>
                            </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>
                                Email
                            </Label>
                            <Col md={8}>
                                <Control.text model=".email" className="form-control"  name="email"
                                id="email" placeholder="email" 
                                validators={{
                                    required,validEmail
                                }}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required:'Required',
                                            validEmail:'Invalid email Address'
                                        }}
                                        />
                            </Col> 
                        </Row>
                        <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                            <Label check>
                                                <Control.checkbox model=".agree" className="form-check-input"
                                                    name="agree" /> {' '}
                                                <strong>May we contact you?</strong>
                                            </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" className="form-control" name="contactType" >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6" className="form-control"/>
                                </Col>
                        </Row>
                        <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    
        );
    }
}
export default Contact;