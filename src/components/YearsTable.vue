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
                v-for="{year, amount, growth, income, initial, isRetired, fees, growthAmount, cost} in years" :key="year"
                :class="{ '' : isRetired && amount > 0, 'bg-danger text-white' : amount < 0}"
                >
                <td>{{ year }}</td>
                <td class="text-right">{{initial | dollars}}</td>
                <td class="text-right">
                <span class="text-danger" v-if="isRetired">
                    -{{cost | dollars}}
                </span>
                <span class="text-success" v-else>
                    +{{income | dollars}}
                </span>
                </td>
                <td class="text-right">{{growth | dollars}} ({{(growthAmount*100).toFixed(0)}}%)</td>
                <td class="text-right text-danger">-{{fees | dollars}}</td>
                <td class="text-right">{{amount | dollars}}</td>
            </tr>

        </tbody>
    </table>
</template>

<script>
import Currency from '../mixins/Currency';

export default {
    props : ['years'],
    components : {},
    mixins : [Currency],
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