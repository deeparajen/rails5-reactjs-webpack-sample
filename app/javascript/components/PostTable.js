import React from 'react';
import Post from './Post'
const PostTable = (props) => {
	
	var posts = [];
    props.posts.forEach(function(post) {
      posts.push(<Post post={post}
                         key={'post' + post.id} categories={props.categories} handleDeleteRecord={props.handleDeleteRecord} handleUpdateRecord={props.handleUpdateRecord}/>);
    }.bind(this));
	
    return(
      <div>
        <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-1">Name</th>
            <th className="col-md-2">Title</th>
            <th className="col-md-1">Author</th>
            <th className="col-md-1">Category</th>
            <th className="col-md-2">Description</th>
            <th className="col-md-2">Published-at</th>
            <th className="col-md-2">Last-edited-at</th>
            <th className="col-md-2">Action</th>
          </tr>
        </thead>
        <tbody>{posts}</tbody>
     </table>
      </div>
    )
  
}
export default PostTable;