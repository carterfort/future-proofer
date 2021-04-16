// This is not a portable mixin. It's mostly (ok solely) just extracted for aesthetic purposes to keep my controller clean

export default {
    computed : {
        years() {
            var years = [];

            var currentYear = (new Date()).getFullYear();
            var amount = parseFloat(this.startingAmount);
            var i = 0;
            var moneyHasRunOut = false;
            var yearsRetired = 0;
            let retirementExposureStages = [1, .75, .5];

            while (i < (parseInt(this.targetWorkingYears) + parseInt(this.targetRetirementYears))) {
                var yearType = false;

                var growthAmount = (this.averageAnnualReturn / 100);
                if (yearsRetired > 0){
                    let currentRetirementStage = Math.ceil((yearsRetired / (this.targetRetirementYears - 1) * 100) / 33.4) - 1;
                    let adjustedGrowthAmount = retirementExposureStages[currentRetirementStage]
                    
                    if (growthAmount && adjustedGrowthAmount)
                        growthAmount *= adjustedGrowthAmount;

                }

                let growth = amount > 0 ? parseFloat(amount * growthAmount) : 0;
                let income = parseFloat(this.annualInputAmount)
                let initial = parseFloat(amount)
                let fees = amount > 0 ? (parseFloat(this.managementFees) / 100) * amount : 0;
                var cost = this.annualRetirementCost;
                if (this.variableAnnualRetirementCost) {
                    cost = (amount * (this.variableAnnualRetirementCost / 100));
                }


                let overrideYear = this.overrideYears.find(y => y.year == currentYear);
                if (overrideYear){
                    cost = overrideYear.cost
                }

                var isRetired = false;

                if (i == 0) {
                    yearType = 'firstYear'
                }

                if (i == this.targetWorkingYears) {
                    yearType = 'retirementYear';
                }

                if (i < this.targetWorkingYears) {
                    amount += growth + income
                } else {
                    amount += growth - cost;
                    income = 0;
                    isRetired = true;
                    yearsRetired++;
                }

                if (overrideYear){
                    console.log(amount)
                }

                amount -= fees;

                if (amount <= 0 && !moneyHasRunOut) {
                    yearType = "moneyRunsOut"
                    moneyHasRunOut = true;
                }

                var yearToAdd = {
                    year: currentYear,
                    initial,
                    amount,
                    growth,
                    income,
                    fees,
                    isRetired,
                    yearType,
                    cost,
                    growthAmount
                };


                years.push(yearToAdd)

                i++
                currentYear++;
            }

            years[years.length - 1].yearType = "finalYear"

            return years;
        }
    }
}