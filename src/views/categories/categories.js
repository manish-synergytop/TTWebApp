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
        categoriesList:[]
      
    };
  }
  componentDidMount(){
   
    fetch("http://203.100.68.130:83/getCategory",{
        method: "Post",
        body:JSON.stringify({page:1}),
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
            result && result.data.forEach((cat)=>{
                var dataArray = [];
                dataArray.push(cat._id)
                dataArray.push(cat.categories)
                dataArray.push(cat.desc)
                dataArray.push(cat.fileName)
                dataArray.push(cat.path)
                //dataArray.push(new Date(trade.createAt).toDateString());
                mainArray.push(dataArray)
            })
            this.setState({
                categoriesList:mainArray
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
          cardTitle="Categories"
          cardSubtitle="Here is a subtitle for this Categories"
          content={
            <Table
              tableHeaderColor="primary"
              tableHead={["CategoryId","Category", "Desc", "FileName", "path"]}
              tableData={this.state.categoriesList}
            />
          }
        />
      </ItemGrid>
    </Grid>
    );
  }
}

export default Trade;
