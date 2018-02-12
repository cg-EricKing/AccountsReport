// Account Report for tracking account stats based on Label
    // Selects up to 50 accounts per label
    // Prints a report with the stats - Name, Cost, Clicks, Impressions, Ctr, AverageCpm
    // Script must be formatted for the correct sheet, condition, label, date range, and order(cost, ctr)
    // Need to figure out a way to execute a log report for a desired label
    // Label name passed in as a parameter in the .withCondition() statement
    // DashHound to display a report like this one?

    function main() {

        // Select accounts at the manager level - format for desired output 
        var accountSelector = MccApp
           .accounts()
           .withCondition("Impressions > 5000")
           .withCondition("LabelNames CONTAINS 'iHeart'")
           .forDateRange("LAST_7_DAYS")
           .orderBy("Cost DESC")
           .withLimit(50);

    // function to take in date range and return a 2d array of data
    function getStats(range) {

        var statsRange = account.getStatsFor(range);
        var clicks = statsRange.getClicks();
        var impressions = statsRange.getImpressions();
        var ctr = statsRange.getCtr();
        var cost = statsRange.getCost();
        var avgCpm = statsRange.getAverageCpm();
        var cpc = statsRange.getAverageCpc();
        var conversions = statsRange.getConversions();
        var conversionRate = statsRange.getConversionRate();

        var statsValues = {
          clickStat: clicks,
          impStat: impressions,
          ctrStat: ctr,
          costStat: cost,
          cpmStat: avgCpm,
          cpcStat: cpc,
          conStat: conversions,
          crStat: conversionRate};

      Logger.log("Clicks: " + statsValues.clickStat + " " + "Impressions: " + statsValues.impStat + " " +
                 "CTR: " + statsValues.ctrStat + " " + "Cost: " + statsValues.costStat + " " + "CPM: " + statsValues.cpmStat + " " +
                 "CPC: " + statsValues.cpcStat + " " + "Conv: " + statsValues.conStat + " " + "ConRate: " + statsValues.crStat);

    }
      
        var accountIterator = accountSelector.get();
        // Iterate over the accounts that match the conditions
        while (accountIterator.hasNext()) {
      
        var account = accountIterator.next();
        MccApp.select(account);
          Logger.log("Account: " + account.getName());
        // Run stat function and pass in date range
        getStats("LAST_7_DAYS");


        }
      }