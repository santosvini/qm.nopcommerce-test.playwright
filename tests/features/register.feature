Feature: Register

    @registerSuccess
    Scenario: Successfull Registration
        Given I'm on the registration page
        When I fill in the registration form
        When I click the register button
        Then I receive the message from your registration completed

    @registerWithoutData
    Scenario: Fill in fields of a blank registration
        Given I'm on the registration page
        When I click the register button
        Then I should see an error message indicating required fields