import React from 'react';
import PostNewForm from './PostNewForm';
import PostTable from './PostTable';
import Pagination from './Pagination';
import Select from 'react-select';

class BodyPostApp extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      intialPosts: [],
      selectedOption: {},
      posts: [],
      categories: [],
      page: 1,
      pages: 0
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
    this.handleUpdateRecord = this.handleUpdateRecord.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.loadData = this.loadData.bind(this);
  }

handleDropDownChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption});
    console.log(`Option selected:`, selectedOption["value"]);
    var self = this;
    
    $.ajax({
    	url: '/posts/search?query='+selectedOption["value"],
        method: 'GET',
		data: { posts: self.state },
		success: function(data) {
			self.setState({ posts: data });
		}
    });
  }

handleUpdateRecord(old_post, post)
{
	var posts = this.state.posts.slice();
    var index = posts.indexOf(old_post);
    posts.splice(index, 1, post);
    this.setState({ posts: posts });
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

handleChangePage(data) {
	this.setState({ posts : data.page_posts });
	this.setState({ page: data.page });
	this.setState({ pages: data.pages });
}

componentDidMount(){
    /*fetch('/posts.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ posts: data }) });  */
     
    var self = this;
    $.ajax({
      url: '/posts/',
      data: { page: self.state.page },
      success: function(data) {
      	self.setState({intialPosts: data.posts});
        self.setState({ posts: data.page_posts, pages: parseInt(data.pages), page: parseInt(data.page) });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from POSTS Controller: ', error);
      }
});
      
    fetch('/categories.json')
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
         <PostNewForm handleAdd={this.handleAdd} categories = {this.state.categories}/>
      </div>
      <div className="col-md-2 col-sm-2 col-xs-2">&nbsp;</div>
      </div>
      
      <div className="row">
      <div className="col-md-12">
         <PostTable posts={this.state.posts} categories={this.state.categories} handleDeleteRecord={this.handleDeleteRecord} handleUpdateRecord={this.handleUpdateRecord}/>
         {this.state.posts.length > 0 && <Pagination page={this.state.page}
                        pages={this.state.pages}
handleChangePage={this.handleChangePage} />}
      </div>
      </div>
     </div>
    )
  }

} // class end

export default BodyPostApp;