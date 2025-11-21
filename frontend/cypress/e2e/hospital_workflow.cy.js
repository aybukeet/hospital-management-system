describe('Hospital Management System Demo', () => {
    it('Complete workflow with unique names', () => {
        // Generate unique timestamp for this test run
        const timestamp = Date.now()
        const uniqueId = timestamp.toString().slice(-6)

        // Visit Dashboard
        cy.visit('/')
        cy.wait(1000)

        // Navigate to Departments
        cy.contains('Departments').click()
        cy.wait(1000)

        // View existing departments
        cy.contains('Cardiology').should('be.visible')
        cy.wait(1000)

        // Navigate to Doctors
        cy.contains('Doctors').click()
        cy.wait(1000)

        // Create a new doctor with unique name
        cy.contains('Add Doctor').click()
        cy.wait(1000)

        // Wait for modal to be fully visible
        cy.get('.modal-overlay').should('be.visible')
        cy.wait(500)

        cy.get('input[placeholder*="name"], input[type="text"]').first().type(`Dr. Smith ${uniqueId}`, { delay: 50 })
        cy.wait(500)
        cy.get('select').first().select('Cardiology')
        cy.wait(500)
        cy.get('input[type="tel"]').type(`555${uniqueId}`, { delay: 50 })
        cy.wait(500)

        // Click Create button inside modal
        cy.get('.modal').find('button').contains('Create').click()

        // Wait for modal to close
        cy.get('.modal-overlay').should('not.exist')
        cy.wait(1500)

        // Verify doctor was created
        cy.contains(`Dr. Smith ${uniqueId}`).should('be.visible')
        cy.wait(1000)

        // Navigate to Patients
        cy.contains('Patients').click()
        cy.wait(1000)

        // Create a new patient with unique name
        cy.contains('Add Patient').click()
        cy.wait(1000)

        // Wait for modal to be fully visible
        cy.get('.modal-overlay').should('be.visible')
        cy.wait(500)

        cy.get('input[placeholder*="name"], input[type="text"]').first().type(`Patient ${uniqueId}`, { delay: 50 })
        cy.wait(500)
        cy.get('input[type="number"]').type('35', { delay: 50 })
        cy.wait(500)
        cy.get('input[type="tel"]').type(`777${uniqueId}`, { delay: 50 })
        cy.wait(500)

        // Click Create button inside modal
        cy.get('.modal').find('button').contains('Create').click()

        // Wait for modal to close
        cy.get('.modal-overlay').should('not.exist')
        cy.wait(1500)

        // Verify patient was created
        cy.contains(`Patient ${uniqueId}`).should('be.visible')
        cy.wait(1000)

        // Navigate to Appointments
        cy.contains('Appointments').click()
        cy.wait(1000)

        // Book an appointment with the newly created doctor and patient
        cy.contains('Book Appointment').click()
        cy.wait(1000)

        // Wait for modal to be fully visible
        cy.get('.modal-overlay').should('be.visible')
        cy.wait(500)

        // Select the doctor
        cy.get('select').first().select(`Dr. Smith ${uniqueId} - Cardiology`)
        cy.wait(500)

        // Select the patient
        cy.get('select').eq(1).select(`Patient ${uniqueId}`)
        cy.wait(500)

        // Set date and time (tomorrow at 10:00)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const dateString = tomorrow.toISOString().slice(0, 16)
        cy.get('input[type="datetime-local"]').type(dateString)
        cy.wait(500)

        // Enter reason
        cy.get('textarea').type('Routine checkup and consultation', { delay: 50 })
        cy.wait(500)

        // Click Book button inside modal
        cy.get('.modal').find('button').contains('Book').click()

        // Wait for modal to close
        cy.get('.modal-overlay').should('not.exist')
        cy.wait(1500)

        // Verify appointment was created
        cy.contains(`Dr. Smith ${uniqueId}`).should('be.visible')
        cy.contains(`Patient ${uniqueId}`).should('be.visible')
        cy.wait(1000)

        // Navigate back to Dashboard
        cy.contains('Dashboard').click()
        cy.wait(1500)

        // View final statistics
        cy.contains('Departments').should('be.visible')
        cy.contains('Doctors').should('be.visible')
        cy.contains('Patients').should('be.visible')
        cy.contains('Appointments').should('be.visible')
        cy.wait(1000)
    })
})
