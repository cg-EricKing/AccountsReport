// Account Report for tracking account stats based on Label
    // Selects up to 50 accounts per label
    // Prints a report with the stats - Name, Cost, Clicks, Impressions, Ctr, AverageCpm
    // Script must be formatted for the correct sheet, condition, label, date range, and order(cost, ctr)

    function main() {
        // Init Spreadsheet
        var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/13MvQ2dXsekZP3ZBXZSoYOCyPsZfVJBTMGIdPAGWw7Zc/edit?usp=sharing');
        var sheetName = spreadsheet.getSheetName();
        // Format report to print on correct sheet  
        var sheet = spreadsheet.getSheets()[1];
        
        // Select accounts at the manager level - format for desired output 
        var accountSelector = MccApp
           .accounts()
           .withCondition("Impressions > 5000")
           .withCondition("LabelNames CONTAINS 'iHeart'")
           .forDateRange("LAST_7_DAYS")
           .orderBy("Cost DESC")
           .withLimit(50);
      
        var accountIterator = accountSelector.get();
        // Iterate over the accounts that match the conditions
        while (accountIterator.hasNext()) {
      
          var account = accountIterator.next();
          MccApp.select(account);
          // AQL query string to select metrics needed for report
          var myString = "SELECT AccountDescriptiveName, Cost, Clicks, Impressions, Ctr, AverageCpm FROM ACCOUNT_PERFORMANCE_REPORT DURING LAST_7_DAYS";
          var myAccount = AdWordsApp.currentAccount();
          Logger.log(myAccount.getCustomerId());
          Logger.log(myString);
          
          // Init report with query string - iterate account data per row into spreadsheet
          var report = AdWordsApp.report(myString);
          var iter = report.rows();
          while (iter.hasNext()) {
            var reportRow = iter.next();
            sheet.appendRow([
                  reportRow["AccountDescriptiveName"], 
                reportRow["Cost"],
                  reportRow["Clicks"],
                  reportRow["Impressions"],  
                  reportRow["Ctr"], 
                  reportRow["AverageCpm"]]);
          }
        }
      }