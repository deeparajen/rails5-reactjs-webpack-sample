import React from 'react';
class Post extends React.Component{
	constructor(props)
	{
		super(props);
		this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getCategory = this.getCategory.bind(this);
		this.state = {
			edit: false,
			category_id: ''
		}
	}
	
	getCategory(category_id)
	{
		let cname = this.props.categories.map((cat) => {return cat.id.toString() === category_id.toString() ? cat.name : ''});
		return cname;
	}
	
	handleUpdate(e)
	{
		e.preventDefault();
		var post_data = {
        name: this.recordValue("name"),
        description: this.recordValue("description"),
        title: this.recordValue("title"),
        author: this.recordValue("author"),
        category_id: document.getElementById("category_id").value
      };
      var self = this;
		$.ajax({
        method: 'PUT',
        url: '/posts/' + self.props.post.id,
        data: { post: post_data },
        success: function(data) {
          self.props.handleUpdateRecord(self.props.post, data);
          self.setState({ edit: false });
          self.setState({ category_id: self.state.category_id });
        }
      })
	}
	
	handleToggle(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
    }
    
    handleChange(e)
    {
    	e.preventDefault();
    	var input_name = e.target.name;
       var value = e.target.value;
       this.setState({ [input_name] : value });
    }
    
    recordValue(field) {
      return document.getElementById(field).value;
  }
	
	handleDeleteRecord(e)
	{
		e.preventDefault();
		console.log(`id = ${this.props.post.id}`);
		var self = this;
		$.ajax({
      method: 'DELETE',
      url: '/posts/' + self.props.post.id,
      success: function(data) {
        self.props.handleDeleteRecord(self.props.post.id);
      }
});
	}
	
	renderForm() {
    return(
      <tr>
        <td>
          <input name="name"
                 defaultValue={this.props.post.name}
                 className="form-control"
                 type="text"
                 id="name"
          />
        </td>
        <td>
          <input name="title"
                 defaultValue={this.props.post.title}
                 className="form-control"
                 type="text"
                 id="title"
          />
        </td>
        <td>
          <input name="author"
                 defaultValue={this.props.post.author}
                 className="form-control"
                 type="text"
                 id="author"
          />
        </td>
        <td>
        <select value={this.state.category_id} className="form-control" onChange={this.handleChange} name="category_id" id="category_id">
		 {this.props.categories.map((category) =>  (
		 	<option value={category.id} key={category.name}>{category.name}</option>
		 ))
		 }
		 
		 </select>
        </td>
        <td>
          <input name="description"
                 defaultValue={this.props.post.description}
                 className="form-control"
                 type="text"
                 id="description"
          />
        </td>
        <td>{this.props.post.published_at}</td>
        <td>{this.props.post.last_edited_at}</td>
        <td>
          <a className="btn btn-success btn-sm"
             onClick={this.handleUpdate}>
            Save
          </a>
          <a className="btn btn-default btn-sm"
             onClick={this.handleToggle} >
            Cancel
          </a>
        </td>
      </tr>
    );
  }
	
	renderRecord(){
    return(
      <tr>
        <td>{this.props.post.name}</td>
        <td>{this.props.post.title}</td>
        <td>{this.props.post.author}</td>
        <td>{this.getCategory(this.props.post.category_id)}</td>
        <td>{this.props.post.description}</td>
        <td>{this.props.post.published_at}</td>
        <td>{this.props.post.last_edited_at}</td>
        <td>
        <a className="btn btn-primary btn-xs"
             onClick={this.handleToggle} >
             Edit
          </a>
        <a className="btn btn-danger btn-xs"
             onClick={this.handleDeleteRecord} >
            Delete
          </a>
        </td>
        
      </tr>
    )
};

  render() {
    if (this.state.edit) {
      return(this.renderForm());
    } else {
      return(this.renderRecord());
    }
  }

}

export default Post;