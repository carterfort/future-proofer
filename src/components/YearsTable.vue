<template>
    <table class="table table-striped small">
        <thead>
            <tr>
            <th>Year</th>
            <th class="text-right">Start of Year</th>
            <th class="text-right">Income/Cost</th>
            <th class="text-right">Growth</th>
            <th class="text-right">Fees</th>
            <th class="text-right">End of Year</th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="yearObj in years" 
                :key="yearObj.year" 
                :yearObj="yearObj" 
                is="StaticYearRow"
                @overrideYear="overrideYear"
            ></tr>
        </tbody>
    </table>
</template>

<script>
import StaticYearRow from './StaticYearRow';

export default {
    props : ['years', 'averageAnnualReturn', 'annualRetirementCost'],
    components : {StaticYearRow},
    data(){
        return {

        }
    },
    mounted(){

    },
    methods : {
        overrideYear(yearToOverride){
            this.$emit('overrideYear', yearToOverride);
        }
    }
}
</script>

<style>
</style>