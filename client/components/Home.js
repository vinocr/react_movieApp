import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Redirect} from 'react-router-dom';
import Searching from './Search';
import DisplayMovie from './Displaymovie.js';
import View from './ViewFavourites.js';
import $ from 'jquery';
import Route from '../clientconfig/routes.js'
var obj;

//Main component
export default class Home extends React.Component{
    
    
    //construcot initialized
    constructor(props) {
    super(props);
    this.state = {drawer: false,logout:false,searchBoxEnable:false,displayFav:false,movieDetails:''};
  }
  
  //togggle function for drawer
  handleToggle() {
      this.setState({drawer:true});
  } 
  
  //search box enable function
  handleSearch() {
        this.setState({searchBoxEnable:true});
        this.setState({displayFav:false});
        this.setState({drawer:false});
  }
  
  //closes drawer
  handleClose(){
      this.setState({drawer: false});
  } 
  
  //uses api and searches the movie and send data to displaymovie component
  displayMovie(moviename){
      this.setState({searchBoxEnable:false});
    var movieObj=obj;
    
    //validates if moviename is not entered
    if(moviename == ""){
        alert("Enter any movie to search");
        this.setState({searchBoxEnable:true});
    }
    else{
      $.ajax({
          url:'https://api.themoviedb.org/3/search/movie?api_key=a8654b92df1d2ce3b89bb66a01da07ff&language=en-US&query=' + moviename + '&page=1&include_adult=false',
          type:'get',
          success:function(data){
             var movie=data.results.map(movieresult =>{
                return (
                <DisplayMovie movie = {movieresult} getFavourites={movieObj.getFavourites.bind(movieObj)}/>
                ); 
              });
              movieObj.setState({displayFav:true});
              movieObj.setState({movieDetails:movie});
          },
          error:function(err){
              console.log('error');
          }
      });
     }
    } 
    
    //add the movie to favourites
    getFavourites(movie){
       $.ajax({
    url: Route.addFavourites,
    type: 'POST',
    data: { 'title':movie.moviename,
            'poster':movie.poster,
            'release_date':movie.date,
            'popularity':movie.popularity,
            'overview':movie.overview,
            'username':localStorage.getItem('name')
          },
    error: function(err) {
      alert("Cannot add as favourites");
    },
    success: function(data) {
        
      if (data=="already added") {
        alert("Movie already addede list!!!!");
      } else {
        alert("Added to favourite list");
      }
    }
  });
  }
  
  //get data from db and displays fav movies
  displayFavourites()
  {
      var display=this;
      this.setState({searchBoxEnable:false});
      this.setState({drawer: false});
      $.ajax({
          url:Route.viewFavourites,
          type:'GET',
          data:{username:localStorage.getItem('name')},
          error:function(err){
              alert('Cannot view the movie');
          },
          success:function(data){
              var viewfav=data.map(viewdata=>{
                  return(
                      <View viewdatas={viewdata} updatedelete={display.updatedelete.bind(display)} />
              );
            });  
            display.setState({displayFav:true});
            display.setState({movieDetails:viewfav});
          } 
      });
  }
  
  //updates the fav list once deleted
  updatedelete(fav){
        var that1 = this;
        $.ajax({
           url:Route.deleteFavourites,
           type:'GET',
           data:{title:fav.movtitle,username:localStorage.getItem('name')},
           error:function(err){
               alert('Movie cannot be Deleted');
           },
           success:function(data){
                 alert('Movie Successfully Deleted');
                 that1.displayFavourites();
           }
        });
  }
  
  //function used for logout using session
  logout(){
      localStorage.removeItem('name');
      var self=this;
      $.ajax({
           url:Route.logout,
           type:'GET',
           success:function(data){
               self.setState({logout:true});
           }
      });
  }
  
    render(){
        obj = this;
        var styles={
            heading:{
                textAlign:'center',
                textShadow:'1px 1px black',
                backgroundColor: Colors.lightBlue300
            },
            
            btncolor:{
                marginTop:'10px'
            }
        }
        
        if(this.state.logout){
            return(
                <Redirect to='/login'/>
            );
        }
        
        return(
        <div>
           
            <AppBar title='PVR Cinemas' style={styles.heading} 
            iconElementRight={<RaisedButton style={styles.btncolor} label="LogOut" onTouchTap={this.logout.bind(this)} primary={true} />} 
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
            
            <Drawer
              docked={false}
              width={200}
              open={this.state.drawer}
              onRequestChange={(drawer) => this.setState({drawer})}>
              <MenuItem onTouchTap={this.handleSearch.bind(this)}>Search</MenuItem>
              <MenuItem onTouchTap={this.displayFavourites.bind(this)}>Display Favourites</MenuItem>
            </Drawer>
            
            {(this.state.searchBoxEnable) ? <Searching displayMovie={this.displayMovie.bind(this)}/> : ''}
            {this.state.displayFav ? <div>{this.state.movieDetails}</div> : <div></div>}
        </div> 
        );
    }
}