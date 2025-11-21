# Clear existing data
Appointment.destroy_all
Doctor.destroy_all
Patient.destroy_all
Department.destroy_all

# Departments
cardiology = Department.create!(name: "Cardiology", description: "Heart and cardiovascular system")
neurology = Department.create!(name: "Neurology", description: "Nervous system disorders")
pediatrics = Department.create!(name: "Pediatrics", description: "Medical care of infants, children, and adolescents")
orthopedics = Department.create!(name: "Orthopedics", description: "Musculoskeletal system")

# Doctors
dr_smith = Doctor.create!(name: "Dr. John Smith", department: cardiology, phone: "555-0101")
dr_jones = Doctor.create!(name: "Dr. Sarah Jones", department: neurology, phone: "555-0102")
dr_brown = Doctor.create!(name: "Dr. Michael Brown", department: pediatrics, phone: "555-0103")
dr_white = Doctor.create!(name: "Dr. Emily White", department: orthopedics, phone: "555-0104")

# Patients
p1 = Patient.create!(name: "Alice Johnson", age: 30, phone: "555-1111")
p2 = Patient.create!(name: "Bob Williams", age: 45, phone: "555-1112")
p3 = Patient.create!(name: "Charlie Davis", age: 10, phone: "555-1113")

# Appointments
Appointment.create!(doctor: dr_smith, patient: p1, date: DateTime.now + 1.day, reason: "Routine Checkup")
Appointment.create!(doctor: dr_jones, patient: p2, date: DateTime.now + 2.days, reason: "Headache")
Appointment.create!(doctor: dr_brown, patient: p3, date: DateTime.now + 3.days, reason: "Fever")

puts "Seed data created successfully!"
