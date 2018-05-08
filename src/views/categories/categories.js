import React from "react";
import { Grid,TextField,MenuItem } from "material-ui";
import { AddAlert,Add } from "@material-ui/icons";
import UploadPreview from 'material-ui-upload/UploadPreview';


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
  Table
} from "components";

const styles = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
}
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
        categoriesList:[],
        open:false,
        category:'',
        status:'',
        desc:"",
        categoryImage: {}
      
    };
  }
  componentDidMount(){
   
    this.getCategoryList();
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
  handleClickOpen = (e) => {
    e.preventDefault();
    console.log("call")
    this.setState({ open: true });
  }
  getCategoryList = () =>{
    fetch("http://203.100.68.130:83/getCategory",{
        method: "Post",
        body:JSON.stringify({page:"0"}),
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
  handleClose = () => {
    this.setState({ open: false });
  }
  handleChange = (e) =>{
    e.preventDefault();
    this.setState({
        [e.target.name]:e.target.value
    })
   
  }
onChange1 = (e) =>{
    console.log("call",e.target.files)
    this.setState({
        categoryImage:e.target.files
    })

} 
submitCategory = (e) => {
    e.preventDefault();
    let url = "";
    let data = {};
    var formData = new FormData();
    if(this.state._id){
        url = "http://203.100.68.130:83/updateCategory"
        console.log("edit called")
        formData.append('category', this.state.category);
        formData.append('status', this.state.status);
        formData.append('desc', this.state.desc);
        formData.append('categoryImage', this.state.desc);
        formData.append('_id', this.state._id);
       
    }else{
        url = "http://203.100.68.130:83/addCategory"
        console.log("add called")
        formData.append('category', this.state.category);
        formData.append('status', this.state.status);
        formData.append('desc', this.state.desc);
        formData.append('categoryImage', this.state.categoryImage[0]);
    }
    
   
    fetch(url,{
        method: "Post",
        body:formData,
        cache: 'no-cache', 
        mode: 'cors', 
        headers:  new Headers({
        'Content-Type': 'multipart/form-data',
        'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYUBnbWFpMjFsNS5jb20iLCJfaWQiOiI1YWJlMDU2YmE1NzE5ZjI3Y2FjNTgzMzMiLCJ1c2VyVHlwZSI6IiIsImlhdCI6MTUyMzI3Nzk4OX0.SLD1x0oN28NFZBl3_Cz5gwFFFE0RCzmt9L04axTSOsM"
        })
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log("result = ",result)
                alert("Succesfully add")
                this.setState({ open: false });
                this.getCategoryList();
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
          cardTitle="Categories"
          cardSubtitle={<Add onClick={(e)=>{this.handleClickOpen(e)}} style={{float:"right",marginTop:"-28px"}}/>}
          content={
            <Table
              tableHeaderColor="primary"
              tableHead={["CategoryId","Category", "Desc", "FileName", "path"]}
              tableData={this.state.categoriesList}
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
                                name="category"
                                label="Category"
                                defaultValue={this.state.category}
                                onChange={(e)=>{this.handleChange(e)}}
                                margin="normal"
                            />
                            
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <TextField
                                required
                                id="required"
                                name="desc"
                                label="Description"
                                defaultValue={this.state.desc}
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
                        <ItemGrid xs={12} sm={12} md={12}>
                            <input id="file_input_file" class="none" type="file" onChange={(e)=>{this.onChange1(e)}}/> 
                        </ItemGrid>
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={(e)=>{this.submitCategory(e)}} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    </Grid>
    );
  }
}

export default Trade;
