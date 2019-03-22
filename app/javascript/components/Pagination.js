import React from 'react';
class Pagination extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			page: 1
		}
		this.paginationElement = this.paginationElement.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
	}
	
	handleChangePage(e)
	{
		e.preventDefault();
		const number = e.target.text
		var self = this;
    $.ajax({
      url: '/posts/',
      data: { page: number },
      success: function(data) {
      	self.props.handleChangePage(data);
      }
});
		
}
	
	
  paginationElement(number) {
    return (
      <li key={'page' + number} 
          className={number == this.props.page ? 'active' : ''}>
        <a onClick={this.handleChangePage}>{number}</a>
      </li>
    )
  }
  
  render() {
    var self = this;
    var page = this.props.page;
    var last_page = this.props.pages;
    var page_links = [];
    var max_elements = 2;
    var pages = [1];

    for (var i = page - max_elements; i <= page + max_elements; i++) {
      if (!pages.includes(i))
        pages.push(i);
    }
    if (!pages.includes(last_page))
      pages.push(last_page);

    pages.forEach((i) => {
      if (i > 0 && i <= last_page)
        page_links.push(self.paginationElement(i));
    });

    return(
      <div className="text-center">
        <ul className="pagination">
          {page_links}
        </ul>
      </div>
    );
  }
};

export default Pagination;

{this.state.posts.length > 0 && <Pagination page={this.state.page}
                        pages={this.state.pages}
handleChangePage={this.handleChangePage} />}