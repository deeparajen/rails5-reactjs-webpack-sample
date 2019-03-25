Rails.application.routes.draw do
  get 'categories/index'
    
  namespace :api do
    namespace :v1 do
      resources :posts do
        get :search, on: :collection
      end
      resources :categories
    end
  end
  
  root to: 'dashboard#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
