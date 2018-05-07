import React from "react";
import { Grid,TextField,MenuItem } from "material-ui";
import { AddAlert,Add,Create,Clear } from "@material-ui/icons";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import {
  RegularCard,
  A,
  P,
  Small,
  Button,
  SnackbarContent,
  Snackbar,
  ItemGrid,
  Table,
  CustomInput
} from "components";


const currencies = [
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Inactive',
    label: 'Inactive',
  },
  
];
class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tradeList:[],
        open:false,
        trade:'',
        status:"",
        _id:""
      
    };
  }
  
  componentDidMount(){
   this.getTradeList();
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  handleClickOpen = (e,trade) => {
    
    if(trade){
        this.setState({
            trade:trade.trade,
            status:trade.status,
            _id:trade._id
        })
    }
    this.setState({ open: true });
  }
  removeTrade = (e,trade) =>{
    let url = "http://203.100.68.130:83/removeTrade"
    fetch(url,{
        method: "Post",
        body:JSON.stringify({_id:trade._id}),
        cache: 'no-cache', 
        mode: 'cors', 
        headers:  new Headers({
        'Content-Type': 'application/json',
        'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYUBnbWFpMjFsNS5jb20iLCJfaWQiOiI1YWJlMDU2YmE1NzE5ZjI3Y2FjNTgzMzMiLCJ1c2VyVHlwZSI6IiIsImlhdCI6MTUyMzI3Nzk4OX0.SLD1x0oN28NFZBl3_Cz5gwFFFE0RCzmt9L04axTSOsM"
        })
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log("result = ",result)
                alert("Succesfully delete")
                this.setState({ open: false });
                this.getTradeList();
            },
            (error) => {
              console.log("error",error)
              alert("Error in deleting trade")
        }
    )
  }
  getTradeList = () => {
    fetch("http://203.100.68.130:83/getTrade",{
        method: "GET",
        cache: 'no-cache', 
        mode: 'cors', 
        headers:  new Headers({
        'Content-Type': 'application/json',
        'authorization':"Key@123"
        })
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log("result = ",result)
            var mainArray = [];
            result.data.forEach((trade)=>{
                var dataArray = [];
                dataArray.push(trade._id)
                dataArray.push(trade.trade)
                dataArray.push(trade.status)
                dataArray.push(new Date(trade.createAt).toDateString());
                dataArray.push(<div><Create onClick={(e)=>{this.handleClickOpen(e,trade)}} />
                    <Clear onClick={(e)=>{this.removeTrade(e,trade)}} /></div>);
                mainArray.push(dataArray)
            })
            this.setState({
                tradeList:mainArray
            })
            
            },
            (error) => {
              console.log("error",error)
        }
    )
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleChange = (e) =>{
    e.preventDefault();
    this.setState({
        [e.target.name]:e.target.value
    })
   
  }
  submitTrade = (e) => {
    e.preventDefault();
    let url = "";
    let data = {};
    if(this.state._id){
        url = "http://203.100.68.130:83/updateTrade"
        console.log("edit called")
        data = {_id:this.state._id,trade:this.state.trade,status:this.state.status}
    }else{
        url = "http://203.100.68.130:83/addTrade"
        console.log("add called")
        data = {trade:this.state.trade,status:this.state.status}
    }
    fetch(url,{
        method: "Post",
        body:JSON.stringify(data),
        cache: 'no-cache', 
        mode: 'cors', 
        headers:  new Headers({
        'Content-Type': 'application/json',
        'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYUBnbWFpMjFsNS5jb20iLCJfaWQiOiI1YWJlMDU2YmE1NzE5ZjI3Y2FjNTgzMzMiLCJ1c2VyVHlwZSI6IiIsImlhdCI6MTUyMzI3Nzk4OX0.SLD1x0oN28NFZBl3_Cz5gwFFFE0RCzmt9L04axTSOsM"
        })
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log("result = ",result)
                alert("Succesfully add")
                this.setState({ open: false });
                this.getTradeList();
            },
            (error) => {
              console.log("error",error)
              alert("Error in adding trade")
        }
    )
  }
  render() {
    return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle="Trade"
          cardSubtitle={<Add onClick={(e)=>{this.handleClickOpen(e)}} style={{float:"right",marginTop:"-28px"}}/>}
          content={
            <Table
              tableHeaderColor="primary"
              tableHead={["TradeId","Trade", "Status", "CreatedAt", "Action"]}
              tableData={this.state.tradeList}
            />
          }
        />
      </ItemGrid>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add Trade"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <ItemGrid xs={12} sm={12} md={12}>
                    <TextField
                        required
                        id="required"
                        name="trade"
                        label="Trade"
                        defaultValue={this.state.trade}
                        onChange={(e)=>{this.handleChange(e)}}
                        margin="normal"
                    />
                    
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={12}>
                <TextField
                        id="select-Status"
                        select
                        label="Select"
                        name="status"
                        value={this.state.status}
                        onChange={(e)=>{this.handleChange(e)}}
                        
                        helperText="Please select your status"
                        margin="normal"
                    >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </ItemGrid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={(e)=>{this.submitTrade(e)}} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    </Grid>
    );
  }
}


export default Trade;
