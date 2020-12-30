import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle,Button,Label, Breadcrumb,Modal,ModalBody,ModalHeader,Col,Row, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm,Errors,Control } from 'react-redux-form';
import {Loading} from './LoadingComponent'; 
import {Stagger,FadeTransform,Fade} from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';
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
        this.toggleModal();
        
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);

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
                                <Label md={12} htmlFor="author">
                                    Your Name
                                </Label>
                                <Col md={12}>
                                <Control.text model=".author" name="author" id="author"
                                placeholder="enter your name" className="form-control"
                                validators={{required,
                                    maxlength:maxlength(15),
                                    minlength:minlength(3)}}
                                />
                                <Errors className="text-danger"
                                    show="touched"
                                    model=".author"
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
    function Displayfun({dish})
    {
        
            
            return(
                <FadeTransform in transformProps={{   exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <Card >
                    <CardImg src={baseUrl+ dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                    </Card>
                </FadeTransform>
 
            );

            
    }
    
    function Commentfun({comments,postComment,dishId})
    {
        
        const dishcom_var=<Stagger in>{comments.map((comment)=>
        { 
            return (
                <Fade in>
                    <li>
                        <p>{comment.comment}</p>
                        <p>{comment.author},{comment.date}</p>
                    
                    </li>
                </Fade>

            );
        
        })}
        </Stagger>

        return(
            
            <div className="pb-3">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                 {dishcom_var}
                 </ul>
                 <CommentForm postComment={postComment} dishId={dishId}/>
            </div> 
            )        
        }
    

    function Detail(props)
    {
        if(props.isLoading)
        {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );

        }
        else if(props.errMsg)
        {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMsg}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish!=null && props.comments!=null)
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                    <Displayfun dish={props.dish}/>
                    </div>
                    <div className="col-md-6 col-12">
                        <Commentfun  comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                    </div>
                </div>
                </div>
                 );
        
        else
            return (
                <div>
                </div>
            );
        

    }

export default Detail;