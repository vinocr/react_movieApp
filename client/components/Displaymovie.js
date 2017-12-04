import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as Colors from 'material-ui/styles/colors';
import {Card,CardMedia,CardText,CardHeader,CardActions} from 'material-ui';
import {Row,Col} from 'react-flexbox-grid';

//display movies which is searched
export default class DisplayMovie extends React.Component{
    
    //constructor initialized
    constructor(props) {
    super(props);
    this.state = {showTitle:false,
    showAction:false,
    title:this.props.movie.title,
    poster:this.props.movie.poster_path,
    date:this.props.movie.release_date,
    popularity:this.props.movie.popularity,
    overview:this.props.movie.overview,
    details:false
    };
  }
    
    //this function is called to hover over the image
    onHover(){
        this.setState({showTitle: true});
        this.setState({showAction: true});
    }
    
    //this function is called hover out of image
    onmouseout()
    {
        this.setState({showTitle : false});
  
    }
    
    //function used to pass data to another component to add on db
    addfavourites(){
        this.props.getFavourites({  moviename:this.state.title,
                                    poster:this.state.poster,
                                    date:this.state.date,
                                    popularity:this.state.popularity,
                                    overview:this.state.overview
                                });
    }
    
    //used to view the details in dialog box when details button is clicked
    viewDetails(){
        this.setState({details:true});
    }
    
    //used to cancels the dialog box
    handleClose(){
        this.setState({details:false});
    }
    
    render(){
         var styles={
           imgsize:{
                 backgroundColor:Colors.blue500,
                 position:'relative',
                 margin:'auto',
                 top:'250px',
            
           },
           imgalign:{
               paddingTop:'10px'
           },
           
           colorchange:{
               color:Colors.red600
           },
           
           carddialog:{
               backgroundColor:Colors.deepPurple200
           },
           
           dialog:{
               backgroundColor:Colors.deepPurple700
           } 
         }
         
         //button actions for dialog box
         const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />
      ]

         return(
            <div>
                <MuiThemeProvider>
                <Row center = 'xs'>  
                <Col xs = {6}>
                    <Card style = {styles.imgsize} onMouseOver={this.onHover.bind(this)} onMouseOut = {this.onmouseout.bind(this)} >
                        {this.state.showTitle ? <CardHeader open={this.state.showTitle}  title={this.props.movie.title}/> : ''}
                        
                        <CardMedia style={styles.imgalign}>
                          <img src={'http://image.tmdb.org/t/p/w185/'+this.props.movie.poster_path} alt="" />
                        </CardMedia>
                        
                        <CardActions>
                          <RaisedButton label="AddFavourites" onTouchTap={this.addfavourites.bind(this)} primary={true} />
                          <RaisedButton label="Details" onTouchTap={this.viewDetails.bind(this)} primary={true} /> 
                        </CardActions>
                    </Card>
                   
                    <Dialog style={styles.dialog}
                      title="Brief Details"
                      actions={actions}
                      modal={true}
                      open={this.state.details}
                    >
                      <CardText style={styles.carddialog}>
                        <b style={styles.colorchange}>MovieName</b> : {this.props.movie.title}<br />
                        <b style={styles.colorchange}>ReleaseDate</b> : {this.props.movie.release_date}<br/>
                        <b style={styles.colorchange}>Popularity</b> : {this.props.movie.popularity}<br/>
                        <b style={styles.colorchange}>OverviewDetails</b> : {this.props.movie.overview}
                      </CardText>
                    </Dialog>
                    
                    </Col>
                    </Row>
                </MuiThemeProvider>
            </div>
         );
     }   
}