import React from 'react';
import PostNewForm from './PostNewForm';
import PostTable from './PostTable';
import Pagination from "react-js-pagination";
import Select from 'react-select';

class BodyPostApp extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      intialPosts: [],
      selectedOption: {},
      posts: [],
      categories: [],
      activePage: 1,
      itemsCountPerPage: 1,
      totalItemsCount: 1
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
    this.handleUpdateRecord = this.handleUpdateRecord.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
   }
  
  
  
  handlePageChange(pageNumber) {
    var self = this;
    $.ajax({
      url: '/api/v1/posts/',
      data: { page: pageNumber },
      success: function(data) {
      	self.setState({
      		 posts: data.page_posts, 
      		 activePage: data.page,
      		itemsCountPerPage: data.per_page, 
      		totalItemsCount: data.pages 
      		});
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from POSTS Controller: ', error);
      }
});
    
  }

handleDropDownChange = (selectedOption) => {
	var x = document.getElementById("error_explanation");
	x.style.display= "none";
	this.setState({ selectedOption: selectedOption});
    var self = this;
    
    $.ajax({
    	url: '/api/v1/posts/search?query='+selectedOption["value"],
        method: 'GET',
		data: { posts: self.state },
		success: function(data) {
			self.setState({ posts: data });
	}
    });
  }

handleUpdateRecord(post) {
  let localPosts = JSON.parse(JSON.stringify(this.state.posts));
  let index =localPosts.findIndex(p=>p.id===post.id);
  localPosts[index] = post;
  this.setState({posts: localPosts});
}

handleDeleteRecord(post_id)
{
	this.setState((prevState) => ({
        posts: prevState.posts.filter((option) => {
            return post_id !== option.id;
        })
     }))
}

handleAdd(post)
{
	 var posts = this.state.posts;
     posts.push(post);
     this.setState({ posts: posts });
}

componentDidMount(){
    /*fetch('/posts.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ posts: data }) });  */
     
    var self = this;
    $.ajax({
      url: '/api/v1/posts/',
      data: { page: self.state.activePage },
      success: function(data) {
      	self.setState({intialPosts: data.posts});
        self.setState({
      		 posts: data.page_posts, 
      		 activePage: data.page,
      		itemsCountPerPage: data.per_page, 
      		totalItemsCount: data.pages 
      		})
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot get data from POSTS Controller: ', error);
      }
});
      
    fetch('/api/v1/categories.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ categories: data }) });
      
      
  }
  
  loadData()
  {
  	 var res = [];
      res = this.state.intialPosts.map((post) => {
      	var obj = {}
	    obj["value"] = post.name,
	    obj["label"]=post.name
	    
	  return obj;
   });
   var result = res.reduce((unique, o) => {
    if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
      unique.push(o);
    }
    return unique;
   },[]);

   return result;
  }
 

render(){
	return(
    	
     <div>
       
       
       <div className="row" style={{ float: "right", width: "40%",display: "inline-block"}}>
        <div className="col-md-4" >
         <label htmlFor="filter">Filter by Name: </label></div>
         <div className="col-md-8" >
         <Select 
          value={this.state.selectedOption}
        onChange={this.handleDropDownChange}
        options={this.loadData()}
        
      /></div>
      <div className="col-md-2 col-sm-2 col-xs-2">&nbsp;</div>
        </div>
        
        <div className="row">
      <div className="col-md-12">
         <PostNewForm handleAdd={this.handleAdd} categories = {this.state.categories} />
      </div>
      <div className="col-md-2 col-sm-2 col-xs-2">&nbsp;</div>
      </div>
      
      <div className="row">
      <div className="col-md-12">
         <PostTable posts={this.state.posts} categories={this.state.categories} handleDeleteRecord={this.handleDeleteRecord} handleUpdateRecord={this.handleUpdateRecord}/>
       </div>
      </div>
      
      <div className="row">
      <div className="col-md-12 d-flex justify-content-center">
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          itemClass='page-item'
          linkClass='page-link'
        />
      </div>
      </div>
      
     </div>
    )
  }

} // class end

export default BodyPostApp;