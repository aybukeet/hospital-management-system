class Api::V1::DoctorsController < ApplicationController
  before_action :set_doctor, only: %i[ show update destroy ]

  def index
    @doctors = Doctor.includes(:department).all
    render json: @doctors, include: :department
  end

  def show
    render json: @doctor, include: :department
  end

  def create
    @doctor = Doctor.new(doctor_params)

    if @doctor.save
      render json: @doctor, status: :created
    else
      render json: @doctor.errors, status: :unprocessable_entity
    end
  end

  def update
    if @doctor.update(doctor_params)
      render json: @doctor
    else
      render json: @doctor.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @doctor.destroy
  end

  private
    def set_doctor
      @doctor = Doctor.find(params[:id])
    end

    def doctor_params
      params.require(:doctor).permit(:name, :department_id, :phone)
    end
end
