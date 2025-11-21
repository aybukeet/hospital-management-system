class Doctor < ApplicationRecord
  belongs_to :department
  has_many :appointments
end
