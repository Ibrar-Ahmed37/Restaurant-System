import React,{Component} from 'react';
import Menu from './menuComponent';
import Detail from './dishDetailComponent';
import About from './aboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './contactComponent';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import {postFeedback, postComment,FetchDishes, FetchComments, FetchPromos, FetchLeaders } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {connect} from'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps=state=>
{
  return{
   
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}
const mapDispatchToProps = dispatch => (
  {
  postFeedback:(firstname, lastname, telnum, email, agree, contactType, message)=>dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  FetchDishes:()=>{dispatch(FetchDishes())},
  FetchComments:()=>{dispatch(FetchComments())},
  FetchPromos:()=>{dispatch(FetchPromos())},
  FetchLeaders:()=>{dispatch(FetchLeaders())},
  
  resetFeedBackForm:()=>{dispatch(actions.reset('feedback'))}
});
class  Main extends Component 
{
  constructor(props)
  {
    super(props);
    
  }
  componentDidMount() {
    this.props.FetchDishes();
    this.props.FetchLeaders();
    this.props.FetchPromos();
    this.props.FetchComments();
    
  }
  
  render()
  {
    const Dishidcomp=({match})=>
    {
        return(
              <div>
                  <Detail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
      postComment={this.props.postComment}
        isLoading={this.props.dishes.isLoading}
        errorMsg={this.props.dishes.errMsg}
        commenterrMsg={this.props.comments.errMsg}
        
       
      
        />
  
              </div>
        );
    };
    const CompforAbout=()=>
    {
        return(<About leaders={this.props.leaders.leaders} leadersLoading={this.props.leaders.isLoading} leaderserrMsg={this.props.leaders.errMsg}/>);
    }
    const CompforContact=()=>
    {
      return(<Contact postFeedback={this.props.postFeedback} resetFeedBackForm={this.props.resetFeedBackForm}/>);
    }
    const HomePage=()=>
    { return(
        //i only need featured ones so use filter
            < Home
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishLoading={this.props.dishes.isLoading}
                 disherrMsg={this.props.dishes.errMsg}
                 promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                 promosLoading={this.props.promotions.isLoading}
                  promoserrMsg={this.props.promotions.errMsg}

                  leader={this.props.leaders.leaders.filter((leader)=> leader.featured )[0]}
                  leadersLoading={this.props.leaders.isLoading}
                  leaderserrMsg={this.props.leaders.errMsg} 
                   
             />
        );
        }

    return (
        <div className="container">
            <Header/>
            <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}  />}/>
                <Route path="/menu/:dishId" component={Dishidcomp }/>
                <Route exact path="/contact" component={CompforContact}/>
                <Route path="/about" component={CompforAbout}/>
                <Redirect to="/home"/>
            </Switch>
            </CSSTransition>
        </TransitionGroup>
        <Footer/>
        </div>
    
  );
}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));