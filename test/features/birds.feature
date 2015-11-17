@libraries=birds
Feature: Birds

Scenario: Add Birds with minimum fields

    Given the following Birds
        ---------------------------------------------------------
        | nameCommon        | nameScientific        | family    |
        | Northern Cardinal | Cardinalis cardinalis | CARD      |
        | Field Sparrow     | Spizella pusilla      | NWSPROW   |
        ---------------------------------------------------------

    When I request all the Birds

    Then I should receive the following Birds
        ---------------------------------------------------------
        | nameCommon        | nameScientific        | family    |
        | Northern Cardinal | Cardinalis cardinalis | CARD      |
        | Field Sparrow     | Spizella pusilla      | NWSPROW   |
        ---------------------------------------------------------