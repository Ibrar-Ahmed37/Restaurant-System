import React,{Component} from 'react';
import {Button, Modal,Row,Col, ModalHeader, ModalBody, Label} from 'reactstrap';
import { LocalForm,Errors,Control } from 'react-redux-form';

const required=(val)=> val &&val.length;
const minlength=(len)=> (val)=> (val) && (val.length>=len);
const maxlength=(len)=> (val)=>!(val) ||(val.length<=len);
class CommentForm extends Component
{
    constructor(props)
    {
            super(props);
            this.state=
            {   
                isModalOpen:false

            };
            this.handleSubmit=this.handleSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
    }
    handleSubmit(values)
    {   alert(JSON.stringify(values));
        console.log(JSON.stringify(values));
        
        
        this.props.addComment(this.props.dishId,values.rating,values.name,values.comment);
        this.toggleModal();
    }
    toggleModal()
    {
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });

    }
    render()
    {
    return(
        <React.Fragment>
            <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row class="form-group">
                                <Label md={12} htmlFor="rating" >
                                        Rating
                                </Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" 
                                     default="1" placeholder="enter Rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="name">
                                    Your Name
                                </Label>
                                <Col md={12}>
                                <Control.text model=".name" name="name" id="name"
                                placeholder="enter your name" className="form-control"
                                validators={{required,
                                    maxlength:maxlength(15),
                                    minlength:minlength(3)}}
                                />
                                <Errors className="text-danger"
                                    show="touched"
                                    model=".name"
                                    messages={{
                                        required :'Required',
                                        minlength:'Must be greater than 2 Characters',
                                        maxlength:'Must be 15 characters or less'
                                    }}
                                >

                                </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>
                                     Comments
                                </Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment"
                                    rows="6"
                                    name="comment" placeholder="Add Comments"
                                    className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Button type="submit" className=" btn btn-info" >Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
            </Modal>
        </React.Fragment>
    );
    }
}
export default CommentForm;