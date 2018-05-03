import React from "react";
import { Grid } from "material-ui";
import { AddAlert } from "@material-ui/icons";

import {
  RegularCard,
  A,
  P,
  Small,
  Button,
  SnackbarContent,
  Snackbar,
  ItemGrid,
  Table
} from "components";

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tradeList:[]
      
    };
  }
  componentDidMount(){
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
  render() {
    return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle="Trade"
          cardSubtitle="Here is a subtitle for this table"
          content={
            <Table
              tableHeaderColor="primary"
              tableHead={["TradeId","Trade", "Status", "CreatedAt"]}
              tableData={this.state.tradeList}
            />
          }
        />
      </ItemGrid>
    </Grid>
    );
  }
}

export default Trade;
