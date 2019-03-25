import React from 'react';
import './custom.css'

class PostNewForm extends React.Component{
    constructor(props)
    {
    	super(props);
    	this.state = {
         name: '',
      title: '',
      author: '',
      description: '',
      category_id: '',
      errors: []
    	}
    	this.handleAdd = this.handleAdd.bind(this);
    }  
    
    validate()
    {
    	const errors = [];

  if (this.state.name.length === 0) {
    errors.push("Name can't be empty!!");
  }

  if (this.state.title.length === 0) {
    errors.push("title can't be empty!!");
  }
  if (this.state.author.length === 0) {
    errors.push("author can't be empty!!");
  }
  if (this.state.description.length === 0) {
    errors.push("description can't be empty!!");
  }
  if (this.state.category_id === '') {
    errors.push("Please select category!!");
  }
  

  return errors;
    }
       
    handleAdd(e)
    {
    	
    	e.preventDefault();
    	let errors = this.validate();
    	if (errors.length > 0) {
           this.setState({ errors });
           var x = document.getElementById("error_explanation");
	       x.style.display= "block";
           return;
        }
    	var self = this;
    	$.ajax({
    		url: '/api/v1/posts',
        method: 'POST',
		data: { post: self.state },
		success: function(data) {
			self.props.handleAdd(data);
			self.setState(() => {
				return {
				name: '',
				title: '',
				author: '',
				description: '',
				category_id: '',
				errors: []
				}
			 });
			
		}.bind(this),
		
        error: function(xhr, status, error) {
        	
          alert('Cannot add a new record: ', error);
        }
    	}) // ajax end
    }
  
    render()
    {
    	const { errors } = this.state;
    	
    	return(
        	
            <div>
            <div id="error_explanation" style={errors.length > 0 ? {} : { display: 'none' }}>
              <ul>
              {errors.map(error => (
          <li key={error}>{error}</li>
             ))}
             </ul>
            </div>
                <form className="form-inline" onSubmit={this.handleAdd}>
		      <div className="form-group">
		        <input type="text"
                 className="form-control"
                 name="name"
                 placeholder="Name"
                 value={this.state.name} 
                 onChange={evt => this.setState({ name: evt.target.value })}
                 />
		 		
		 </div>
		
		 <div className="form-group">
		 <input type="text"
                 className="form-control"
                 name="title"
                 placeholder="Title"
                 value={this.state.title} 
                 onChange={evt => this.setState({ title: evt.target.value })}
                 />
		 
		 </div>
		 <div className="form-group">
		 <input type="text"
                 className="form-control"
                 name="author"
                 placeholder="Author"
                 value={this.state.author} 
                 onChange={evt => this.setState({ author: evt.target.value })}
                 />
		 
		 </div>
		 <div className="form-group">
		 <select 
		 value={this.state.category_id} 
		 className="form-control" 
		 onChange={evt => this.setState({ category_id: evt.target.value })}
		 name="category_id"
		 >
		 <option slected="selected">Please Select Option</option>
		 {this.props.categories.map((category) =>  (
		 	<option value={category.id} key={category.name}>{category.name}</option>
		 ))
		 }
		 
		 </select>
		 </div>
		 <div className="form-group">
		 <input type="text"
                 className="form-control"
                 name="description"
                 placeholder="Description"
                 value={this.state.description} 
                 onChange={evt => this.setState({ description: evt.target.value })}
                 />
		 
		 </div>
		 <button type="submit" className="btn btn-primary">Add</button>
		
		</form>
            </div>
        );
    }
}
export default PostNewForm;