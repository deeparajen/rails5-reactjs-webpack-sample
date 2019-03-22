class Post < ApplicationRecord
  before_save :post_published
  before_update :post_last_edited
  
  belongs_to :category
  
  def post_published
    self.published_at = Date.today
  end
  
  def post_last_edited
    self.last_edited_at = Date.today
  end
end
