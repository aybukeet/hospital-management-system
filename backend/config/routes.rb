Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :departments
      resources :doctors
      resources :patients
      resources :appointments
    end
  end
end
