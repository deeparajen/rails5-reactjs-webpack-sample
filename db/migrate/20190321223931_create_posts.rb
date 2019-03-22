class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :name
      t.string :title
      t.string :author
      t.text :description
      t.date :published_at
      t.date :last_edited_at

      t.timestamps
    end
  end
end
