import React from 'react';
import {Redirect} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {lightBlue100,lightBlue400} from 'material-ui/styles/colors';
import {Grid,Row,Col} from 'react-flexbox-grid';
import $ from 'jquery';

/*form field component */
export default class Login extends React.Component {
  //constructor initialized
  constructor() {
    super();
   this.state = {
       name :'',
       password:'',
       login:false,
       loginsuccess:false
   };
    }
     
     //gets the name and set to state
     onChangeName(e) {
         var name=e.target.value;
        this.setState({name: name});
        localStorage.setItem("name",name);
    }

     //gets the password and set to state
     onChangePassword(e) {
        this.setState({password: e.target.value});
    }

     //function for login if authenticated
     loginuser(event){
        event.preventDefault();
        
        if(this.state.name == "" || this.state.password == ""){
            alert("Fill out the Empty fields");
        }
        else{
            $.ajax({
               url:'http://eclipseche3.niit-mts.com:35509/login',
               type: 'POST',
               datatype: 'JSON',
               data:{
                 'username':this.state.name,
                 'password':this.state.password
               },
               success: function(res){
                 this.setState({loginsuccess:true});
               }.bind(this),
               error: function(err){
                 alert("Invalid username or password");
               }.bind(this)
        });
        }    
    }

    /* rendering method */
    render(){
        /*stylesheet for Paper component */
        const styles = {
            paper: {
                    width: '70%',
                    height: '400px',
                    margin: '70px 140px',
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor:lightBlue100
            },
            
            header: {
                     textShadow:'1px 1px black',
                     color:lightBlue400
            }
        };

         if(this.state.loginsuccess) {
              return (
                <Redirect to='/home'/>
              );
         }

        return(
                <MuiThemeProvider>
                  <div>
                  <Grid>
                    <Row center="xs">
                        <Col md={9}>
                            <Paper style={styles.paper}>
                                <h1 style={styles.header}>PVR Cinemas</h1>
                            <form onSubmit={this.loginuser.bind(this)}>
                                <TextField value={this.state.name} onChange={this.onChangeName.bind(this)} 
                                  hintText="username"
                                  floatingLabelText="UserName" /><br />
                                <TextField value={this.state.password} onChange={this.onChangePassword.bind(this)}
                                  hintText="password"
                                  type="password"
                                  floatingLabelText="Password" /><br />
                                <RaisedButton label="Login" type="submit" primary={true} />
                            </form>
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
                  </div>
                </MuiThemeProvider>
       );
    }
  }