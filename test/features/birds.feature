@libraries=birds
Feature: Birds

Scenario: Add Birds with all fields

    Given the following Birds
        -------------------------------------------------------------------
        | nameCommon        | nameScientific        | family    | regions |
        | Northern Cardinal | Cardinalis cardinalis | CARD      | NENGL   |
        | Field Sparrow     | Spizella pusilla      | NWSPROW   | MDATL   |
        -------------------------------------------------------------------

    When I request all the Birds

    Then I should receive the following Birds
        -------------------------------------------------------------------
        | nameCommon        | nameScientific        | family    | regions |
        | Northern Cardinal | Cardinalis cardinalis | CARD      | NENGL   |
        | Field Sparrow     | Spizella pusilla      | NWSPROW   | MDATL   |
        -------------------------------------------------------------------