import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
       
        comment: comment
    }
});
export const postFeedback=(firstname,lastname,telnum,email,agree,contactType,message)=>(dispatch)=>
{
    const newFeedback=
    {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    }
    return fetch(baseUrl+'feedback',{
        method:'POST',
        body:JSON.stringify(newFeedback),
        headers:
        {
            'Content-Type':'application/json'
        },
        credentials:"same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        }
        else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
      .then(response => response.json())
      .then(response => {alert(JSON.stringify(response)); })
      .catch(error => {
        console.log('post feedback ', error.message);
        alert('Your feedback could not be posted\nError: ' + error.message);
      });

}
export const postComment=(dishId, rating, author, comment)=>(dispatch)=>
{
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    return fetch(baseUrl+'comments',
    {
        method:"POST",
        body:JSON.stringify(newComment),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"same-origin"

    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response=>dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}

//THIS WAS PREVIOUS ..NEECHAY WALA SERVER SAY LEYGA NEW
// export const FetchDishes=()=>(dispatch)=>
// {
//     dispatch(dishesLoading(true));
//     setTimeout(()=>{dispatch(addDishes(DISHES))},2000);
// }



 export const FetchDishes=()=>(dispatch)=>
 {
     dispatch(dishesLoading(true));
    return fetch(baseUrl+'dishes')
    .then(response=>
        {   if(response.ok)
                return response;//chained with the next then
            else
            {
                var error=new Error('Error'+response.status+': '+response.statusText);
                error.response=response;
                throw error;
            }
        }, //next error is for when server is not even connected or no response is accepted
        error=>
        {
            var errmess=new Error(error.message);
            throw errmess;
        }
        )
    .then(response=>response.json())
    .then(dishes=>dispatch(addDishes(dishes)))
    .catch(error=>dispatch(dishesFailed(error.message)));
}
export const FetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
      .then(response => {
        if (response.ok) {
          return response;
        }
        else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
      .then(response => response.json())
      .then(leaders => dispatch(addLeaders(leaders)))
      .catch(error => dispatch(leadersFailed(error.message)));
  };
export const FetchComments=()=>(dispatch)=>
{
    return fetch(baseUrl+'comments')
    .then(response=>
        {   if(response.ok)
                return response;//chained with the next then
            else
            {
                var error=new Error('Error'+response.status+': '+response.statusText);
                error.response=response;
                throw error;
            }
        }, //next error is for when server is not even connected or no response is accepted
        error=>
        {
            var errmess=new Error(error.message);
            throw errmess;
        }
        )
        .then(response=>response.json())
    .then(comments=>dispatch(addComments(comments)))
    .catch(error=>dispatch(commentsFailed(error.message)));
}
export const FetchPromos=()=>(dispatch)=>
{
    dispatch(promosLoading(true));
    return fetch(baseUrl+'promotions')
    .then(response=>
        {   if(response.ok)
                return response;//chained with the next then
            else
            {
                var error=new Error('Error'+response.status+': '+response.statusText);
                error.response=response;
                throw error;
            }
        }, //next error is for when server is not even connected or no response is accepted
        error=>
        {
            var errmess=new Error(error.message);
            throw errmess;
        }
        )
    .then(response=>response.json())
    .then(promos=>dispatch(addPromos(promos)))
    .catch(error=>dispatch(promosFailed(error.message)));
}

export const leadersLoading=()=>
({
    type:ActionTypes.LEADERS_LOADING
    
});
export const leadersFailed=(errMsg)=>
({
    type:ActionTypes.LEADERS_FAILED,
    payload : errMsg
});
export const addLeaders=(leaders)=>
(
    {
        type:ActionTypes.ADD_LEADERS,
        payload: leaders
    }
);
export const addComments=(comments)=>
({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})
export const commentsFailed=(errmess)=>
({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
});


export const addPromos=(promos)=>
({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});
export const promosLoading=()=>
({
    type:ActionTypes.PROMOS_LOADING

});
export const promosFailed=(errmess)=>
({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmess
});

export const dishesLoading=()=>
({
    type:   ActionTypes.DISHES_LOADING,
   
});
export const dishesFailed=(errMsg)=>
({
    type: ActionTypes.DISHES_FAILED,
    payload:  errMsg


});
export const addDishes=(dishes)=>
({  
    type: ActionTypes.ADD_DISHES,
    payload: dishes
        

});