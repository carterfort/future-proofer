<template>
  <div id="app" class="bg-light ">
    <div class="container bg-white">
        <div class="pt-5">
          <div class="row">
            <div class="col-lg-4 small">
              <adjustments-controller
                :values="adjustmentValues"
                :prettyDollars="prettyDollars"
                @update="updateAdjustmentProperty"
              ></adjustments-controller>

              <output-table
                :years="years"
              ></output-table>

            </div>
            <div class="col-lg-8">
              <div class="mb-3 d-flex">
                <div class="form-check form-switch">
                  <input class="form-check-input" id="showAllYearsCheckbox" type="checkbox" v-model="showAllYears">
                  <label class="form-check-label" for="showAllYearsCheckbox">Show All {{ years.length }} Years</label>
                </div>

                <button class="btn btn-outline-primary ml-auto" @click="downloadCSV">Download CSV</button>
              </div>
              <years-table
                :years="years"
              ></years-table>
            </div>
          </div>
          
          
        </div>

    </div>

  </div>
</template>

<script>

import AdjustmentsController from './components/AdjustmentsController'
import OutputTable from './components/OutputTable.vue'
import YearsTable from './components/YearsTable';
import Currency from './mixins/Currency'
import CalculatesYears from './mixins/CalculatesYears'
import DownloadsCSV from './mixins/DownloadsCSV'

export default {
  name: 'App',
  mixins : [Currency, CalculatesYears, DownloadsCSV],
  components : {
    AdjustmentsController, OutputTable, YearsTable
  },
  computed : {
    adjustmentValues(){
      return {
        targetWorkingYears : this.targetWorkingYears,
        targetRetirementYears : this.targetRetirementYears,
        annualRetirementCost : this.annualRetirementCost,
        averageAnnualReturn : this.averageAnnualReturn,
        startingAmount : this.startingAmount,
        annualInputAmount : this.annualInputAmount,
        managementFees : this.managementFees,
        variableAnnualRetirementCost : this.variableAnnualRetirementCost,
        savingsIncreasePercentage: this.savingsIncreasePercentage
      }
    },
    displayYears(){
      if (this.showAllYears){
        return [...this.years].reverse()
      } else {
        return [...this.years].reverse().filter( y => !!y.yearType);
      }
    }
  },
  watch : {
    showAllYears(){
      this.updateQueryParam('showAllYears', !!this.showAllYears)
    }
  },
  data(){
    return {
      targetWorkingYears : this.queryParam('targetWorkingYears', 20),
      startingAmount : this.queryParam('startingAmount', 10000),
      averageAnnualReturn : this.queryParam('averageAnnualReturn', 10),
      annualInputAmount : this.queryParam('annualInputAmount', 15000),
      targetRetirementYears: this.queryParam('targetRetirementYears', 30),
      annualRetirementCost: this.queryParam('annualRetirementCost', 100000),
      variableAnnualRetirementCost : this.queryParam('variableAnnualRetirementCost', false),
      managementFees : this.queryParam('managementFees', 0.1),
      showAllYears : !!this.queryParam('showAllYears', true),
      savingsIncreasePercentage: this.queryParam('savingsIncreasePercentage', 5)
    }
  },
  methods : {
    updateAdjustmentProperty({field, value}){
       this[field] = value;
       this.updateQueryParam(field, value)
    },
    queryParam(param, defaultValue){
      let uri = window.location.search; 
      let parameter = new URLSearchParams(uri).get(param);
      if (parameter){
        return parameter
      }
      
      return defaultValue;
    },
    updateQueryParam(param, value){
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set(param, value);
      window.history.replaceState(null, '', '?'+searchParams.toString())
    },
    downloadCSV(){
      let csv = this.convertToCSV(this.years);

      var encodedUri = encodeURI(csv);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Retirement Plan.csv");
      document.body.appendChild(link); // Required for FF

      link.click(); // This will download the data file named "my_data.csv".
    }
  },
}
</script>