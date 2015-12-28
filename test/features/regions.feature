@libraries=regions
Feature: Regions

Scenario: Add Regions with all fields

    Given the following Regions
        ---------------------------------------------
        | uid      | name       | description       |
        | testUid1 | testName1  | testDescription1  |
        | testUid2 | testName2  | testDescription2  |
        ---------------------------------------------

    When I request all the Regions

    Then the following Regions should be included
        ---------------------------------------------
        | uid      | name       | description       |
        | testUid1 | testName1  | testDescription1  |
        | testUid2 | testName2  | testDescription2  |
        ---------------------------------------------