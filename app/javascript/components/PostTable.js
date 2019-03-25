import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import './custom.css'

class PostTable extends React.Component{
  constructor(props)
  {
  	super(props);
  	this.state = {
  		isInEditable: false,
  		post_edit_id: '',
  		value: '',
  		category_id: ''
  	}
  	this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
  	this.getCategory = this.getCategory.bind(this);
  	this.handleToggle = this.handleToggle.bind(this);
  	this.handleUpdate = this.handleUpdate.bind(this);
  	//this.onRowClick = this.onRowClick.bind(this);
  	this.handleChange = this.handleChange.bind(this);
  }	
  
  handleDeleteRecord(id)
	{
	  var self = this;
	  $.ajax({
      method: 'DELETE',
      url: '/api/v1/posts/' + id,
      success: function(data) {
        self.props.handleDeleteRecord(id);
      }
     });
	}
	
	handleUpdate(post)
	{ 
		var post_data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        category_id: this.state.category_id != '' ? this.state.category_id : post.category_id
      };
      var self = this;
		$.ajax({
        method: 'PUT',
        url: '/api/v1/posts/' + post.id,
        data: { post: post_data },
        success: function(data) {
          self.props.handleUpdateRecord(data);
          self.setState({ isInEditable: false });
          self.setState({ post_edit_id: '' });
          self.setState({ category_id: '' });
        }
      })
	}
	
	handleToggle(id) {
    this.setState({ isInEditable: !this.state.isInEditable });
    this.setState({ post_edit_id: id });
    }
	
	getCategory(category_id)
	{
		const cname = this.props.categories.map((cat) => {return cat.id.toString() === category_id.toString() ? cat.name : ''});
		return cname;
	}
	
	handleChange()
    {
       var value = document.getElementById("category_id").value;
       console.log(value)
       this.setState({ category_id: value });
    }
	
  render() {
   	const columns =[
         {
             Header: "Name",
             accessor: "name",
             style: {
                 textAlign: "center"
             },
             width: 100,
             maxwidth: 100,
             minwidth: 100,
             Cell: props => {
                return (
                	<div>
                	{ this.state.isInEditable && this.state.post_edit_id === props.original.id ?
                	  <input name="name"
                	  defaultValue={props.original.name}
                	  className="form-control"
                      type="text"
                      id="name"
                	  />
                	  :
                	  props.original.name
                	}
                	
                	</div>
                  
                )
              }
             
         },
         {
            Header: "Title",
            accessor: "title",
            style: {
                 textAlign: "center"
             },
            sortable: false,
            filterable: false,
            Cell: props => {
                return (
                	<div>
                	{ this.state.isInEditable && this.state.post_edit_id === props.original.id ?
                	  <input name="title"
                	  defaultValue={props.original.title}
                	  className="form-control"
                      type="text"
                      id="title"
                	  />
                	  :
                	  props.original.title
                	}
                	
                	</div>
                  
                )
              }
        },
        {
            Header: "Author",
            accessor: "author",
            style: {
                 textAlign: "center"
             },
            sortable: false,
            filterable: false,
            Cell: props => {
                return (
                	<div>
                	{ this.state.isInEditable && this.state.post_edit_id === props.original.id ?
                	  <input name="author"
                	  defaultValue={props.original.author}
                	  className="form-control"
                      type="text"
                      id="author"
                	  />
                	  :
                	  props.original.author
                	}
                	
                	</div>
                  
                )
              }
        },
        {
            Header: "Description",
            accessor: "description",
            style: {
                 textAlign: "center"
             },
            sortable: false,
            filterable: false,
            Cell: props => {
                return (
                	<div>
                	{ this.state.isInEditable && this.state.post_edit_id === props.original.id ?
                	  <input name="description"
                	  defaultValue={props.original.description}
                	  className="form-control"
                      type="text"
                      id="description"
                	  />
                	  :
                	  props.original.description
                	}
                	
                	</div>
                  
                )
              }
        },
        {
            Header: "Category",
            accessor: "category_id",
            style: {
                 textAlign: "center"
             },
            sortable: false,
            filterable: false,
            Cell: props => {
            	 const value = this.state.category_id != '' && this.state.post_edit_id === props.original.id ? this.state.category_id : props.original.category_id
                return (
             
                	<div>
                	{ this.state.isInEditable && this.state.post_edit_id === props.original.id ?
                	  <select defaultValue={value} className="form-control" onChange={this.handleChange} name="category_id" id="category_id">
		 {this.props.categories.map((category) =>  (
		 	<option value={category.id} key={category.name}>{category.name}</option>
		 ))
		 }
		 
		 </select>
                	  :
                	  this.getCategory(props.original.category_id)
                	}
                	
                	</div>
                  
                )
               }
        },
        {
            Header: "Published at",
            accessor: "published_at",
            sortable: false,
            filterable: false,
            width: 100,
            maxwidth: 100,
            minwidth: 100
        },
        {
            Header: "Last edited at",
            accessor: "last_edited_at",
            sortable: false,
            filterable: false,
            width: 100,
            maxwidth: 100,
            minwidth: 100
        },
        {
            Header: "Action",
            Cell: props => {
            	let button = [];
            	if (this.state.isInEditable && this.state.post_edit_id === props.original.id) {
      button = [<a className="btn btn-success btn-xs"
                     key={"save_"+props.original.id}
                     onClick={() => {
                        this.handleUpdate(props.original);
                        
                    }}
                      >
                     Save
                   </a>,
                   <a className="btn btn-success btn-xs"
                   key={"Cancel_"+props.original.id}
                   onClick={() => {
                        this.handleToggle(props.original.id);
                    }}
                    >
                     Cancel
                  </a>]
    } else {
      button = [<a className="btn btn-primary btn-xs"
                     key={"edit_"+props.original.id}
                     onClick={() => {
                        this.handleToggle(props.original.id);
                        
                    }}
                      >
                     Edit
                   </a>,
                   <a className="btn btn-danger btn-xs"
                   key={"delete_"+props.original.id}
                   onClick={() => {
                        this.handleDeleteRecord(props.original.id);
                    }}
                    >
                     Delete
                  </a>]
    }
            	
                return (
                	<div className="btn-toolbar">
                	
                	{button}
                  </div>
                )
            },
            sortable: false,
            filterable: false,
            width: 100,
            maxwidth: 100,
            minwidth: 100
        }
        
     ]
     
     
     return(
      <div>
         <ReactTable 
          columns={columns}
          data={this.props.posts}
          pageSize={this.props.posts.length}
          showPagination={false}
          className="table table-striped"
           
          >
          </ReactTable>
      
        
      </div>
    )
    
  }

}


export default PostTable;