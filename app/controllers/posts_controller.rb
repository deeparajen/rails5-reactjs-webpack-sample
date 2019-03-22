class PostsController < ApplicationController
  before_action :set_post, only: [:update, :destroy]
   
  def index
    @posts = Post.order("name asc")
    @page_posts = @posts.paginate(:page => params[:page],:per_page => 2)
     render json: {
       posts: @posts,
       page_posts: @page_posts,
       per_page: @page_posts.per_page,
      page: @page_posts.current_page,
      pages: @posts.length
     } 
  end
  
  def create
    post = Post.new(post_params)
      if post.save
        render json: post
      else
        render nothing: true, status: :bad_request
      end
    
  end
  
  def update
      if @post.update(post_params)
        render json: @post
      else
        render nothing: true, status: :unprocessable_entity
      end
  end
  
  def destroy
    @post.destroy
    head :no_content
  end
  
  def search
    puts "**************************"
    puts params[:query].inspect
    query = params[:query]
    posts = Post.where('name LIKE ?',
                       "%#{query}%")
    render json: posts
  end
  
  def set_post
      @post = Post.find(params[:id])
    end
  
  private
   # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:name, :title, :author, :description, :category_id)
    end
end
