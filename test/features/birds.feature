@libraries=birds
Feature: Birds

Scenario: Add Birds with minimum fields

    Given the following Birds
        ---------------------------------------------------------
        | name_common       | name_scientific       | family_id |
        | Northern Cardinal | Cardinalis cardinalis | 1         |
        | Field Sparrow2    | Spizella pusilla      | 2         |
        ---------------------------------------------------------

    When I request all the Birds

    Then I should receive the following Birds
        ---------------------------------------------------------
        | name_common       | name_scientific       | family_id |
        | Northern Cardinal | Cardinalis cardinalis | 1         |
        | Field Sparrow2    | Spizella pusilla      | 2         |
        ---------------------------------------------------------