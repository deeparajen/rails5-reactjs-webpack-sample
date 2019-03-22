import React from 'react';
class PostNewForm extends React.Component{
    constructor(props)
    {
    	super(props);
    	this.state = {
         name: '',
      title: '',
      author: '',
      description: '',
      category_id: ''
    	}
    	this.handleAdd = this.handleAdd.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    }  
    
    handleChange(e)
    {
    	e.preventDefault();
    	var input_name = e.target.name;
       var value = e.target.value;
       this.setState({ [input_name] : value });
    }
   
    handleAdd(e)
    {
    	
    	e.preventDefault();
    	var self = this;
    	$.ajax({
    		url: '/posts',
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
				category_id: ''
				}
			 });
			
		}
    	}) // ajax end
    }
  
    render()
    {
        return(
            <div>
                <form className="form-inline" onSubmit={this.handleAdd}>
		 <div className="form-group">
		 <input type="text"
                 className="form-control"
                 name="name"
                 placeholder="Name"
                 value={this.state.name} 
                 onChange={this.handleChange}
                 />
		 
		 </div>
		 <div className="form-group">
		 <input type="text"
                 className="form-control"
                 name="title"
                 placeholder="Title"
                 value={this.state.title} 
                 onChange={this.handleChange}
                 />
		 
		 </div>
		 <div className="form-group">
		 <input type="text"
                 className="form-control"
                 name="author"
                 placeholder="Author"
                 value={this.state.author} 
                 onChange={this.handleChange}
                 />
		 
		 </div>
		 <div className="form-group">
		 <select value={this.state.category_id} className="form-control" onChange={this.handleChange} name="category_id">
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
                 onChange={this.handleChange}
                 />
		 
		 </div>
		 <button type="submit" className="btn btn-primary">Add</button>
		
		</form>
            </div>
        );
    }
}
export default PostNewForm;