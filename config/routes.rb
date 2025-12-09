# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  get 'home/index'
  devise_for :users
  # Web UI routes
  resources :books
  root to: 'home#index'

  # API routes
  namespace :api do
    namespace :v1 do
      resources :books, only: %i[index show create]
    end
  end

  # Admin/monitoring
  mount Sidekiq::Web => '/sidekiq'
end
