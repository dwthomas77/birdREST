@libraries=families
Feature: Families

Scenario: Add Families with all fields

    Given the following Families
        ---------------------------------------------
        | uid      | name       | description       |
        | testUid1 | testName1  | testDescription1  |
        | testUid2 | testName2  | testDescription2  |
        ---------------------------------------------

    When I request all the Families

    Then the following families should be included
        ---------------------------------------------
        | uid      | name       | description       |
        | testUid1 | testName1  | testDescription1  |
        | testUid2 | testName2  | testDescription2  |
        ---------------------------------------------