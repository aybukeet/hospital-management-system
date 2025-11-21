class Appointment < ApplicationRecord
  belongs_to :doctor
  belongs_to :patient

  validate :no_conflict

  private

  def no_conflict
    if Appointment.where(doctor_id: doctor_id, date: date).exists?
      errors.add(:date, "Doctor is already booked at this time")
    end
  end
end
