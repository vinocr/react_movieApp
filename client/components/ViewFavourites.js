import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as Colors from 'material-ui/styles/colors';
import {Card,CardMedia,CardText,CardHeader,CardActions} from 'material-ui';
import {Row,Col} from 'react-flexbox-grid';
import $ from 'jquery';
import Route from '../clientconfig/routes.js'

//componenent to view the favourites
export default class View extends React.Component{
    
    
    //constructor initilalized
     constructor(props) {
    super(props);
    this.state = { details:false,
                   movietitle:this.props.viewdatas.Title
                           
    };
  }
    
     //shows fav details when details button is clicked
     showfavdetails(){
        this.setState({details:true});
    }
    
    //closed the dialog box when cancel button clicked
    handleClose(){
        this.setState({details:false});
    }
    
    //deletes the movie from favourites
    deletefav(){
      this.props.updatedelete({movtitle:this.state.movietitle});
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
       
       carddialog:{
           backgroundColor:Colors.deepPurple200
       },
       
       head:{
           color:'red',
           textAlign:'center'
       }
     }
      
      //action button for dialog box
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
                <Card style = {styles.imgsize}>
                    <CardHeader title={this.props.viewdatas.Title}/>
                    <CardMedia style={styles.imgalign}>
                      <img src={'http://image.tmdb.org/t/p/w185/'+this.props.viewdatas.Poster} alt="" />
                    </CardMedia>
                    <CardActions>
                      <RaisedButton label="Details" onTouchTap={this.showfavdetails.bind(this)} primary={true} />
                      <RaisedButton label="Delete" onTouchTap={this.deletefav.bind(this)} primary={true} /> 
                    </CardActions>
                </Card>
                <Dialog style={styles.dialog}
                  title="Brief Details"
                  actions={actions}
                  modal={true}
                  open={this.state.details}
                >
                  <CardText style={styles.carddialog}>
                    <b style={styles.colorchange}>MovieName</b> : {this.props.viewdatas.Title}<br />
                    <b style={styles.colorchange}>ReleaseDate</b> : {this.props.viewdatas.Release_Date}<br/>
                    <b style={styles.colorchange}>Popularity</b> : {this.props.viewdatas.Popularity}<br/>
                    <b style={styles.colorchange}>OverviewDetails</b> : {this.props.viewdatas.Overview}
                  </CardText>
                </Dialog>
             </Col>
             </Row>
            </MuiThemeProvider>
        </div>
    );
    }
}