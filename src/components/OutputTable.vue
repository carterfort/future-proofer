<template>
    <table class="table table-hover">
        <tbody>
            <tr>
                <td>You would retire in...</td>
                <td>{{retirementYear}}</td>
            </tr>
            <tr>
                <td>You would retire with...</td>
                <td>{{retirementAmount | dollars}}</td>
            </tr>
            <tr v-if="yearMoneyRunsOut" class="bg-danger text-white">
                <td>You will run out of money in...</td>
                <td>{{yearMoneyRunsOut}}</td>
            </tr>
            <tr v-else>
                <td>Your final amount would be...</td>
                <td>{{ finishLine | dollars}}</td>
            </tr>
            <tr>
                <td>Your money management fees will have been...</td>
                <td>{{ totalFees | dollars }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Currency from '../mixins/Currency';

export default {
    props : ['years'],
    mixins : [Currency],
    computed : {
        retirementAmount(){
            let retirementYear = this.years.find(y => y.yearType == "retirementYear")
            if (retirementYear)
                return retirementYear.amount;

            return "?";
        },
        retirementYear(){
            let retirementYear = this.years.find(y => y.yearType == "retirementYear")
            if (retirementYear)
                return retirementYear.year;

            return "?";
        },
        yearMoneyRunsOut(){
            let ymro = this.years.find( y => y.yearType == "moneyRunsOut");
            if (ymro){
                return ymro.year
            }
            return false
        },
        finishLine(){
            if (this.years.length)
                return [...this.years].reverse()[0].amount;
            
            return "Never";
        },
        totalFees(){
            var total = 0;
            this.years.forEach( y => {total += y.fees});
            return total;
        },
        totalYears(){
            return parseInt(this.targetWorkingYears) + parseInt(this.targetRetirementYears)
        }
    },
    data(){
        return {

        }
    },
    mounted(){

    },
    methods : {

    }
}
</script>

<style>
</style>