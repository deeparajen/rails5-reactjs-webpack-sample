Rails.application.routes.draw do
  get 'categories/index'
  resources :posts do
    get :search, on: :collection
  end
  
  resources :categories
  root to: 'dashboard#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
