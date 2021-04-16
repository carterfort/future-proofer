<template>
    <tr :class="{ '' : isRetired && amount > 0, 'bg-danger text-white' : amount < 0}">
        <td>{{ year }}</td>
        <td class="text-right">{{initial | dollars}}</td>
        <td class="text-right">
        <span class="text-danger" v-if="isRetired" >
            - <input class="cost-override" @input="overrideYear" :value="cost" />
        </span>
        <span class="text-success" v-else>
            +{{income | dollars}}
        </span>
        </td>
        <td class="text-right">{{growth | dollars}} ({{(growthAmount*100).toFixed(0)}}%)</td>
        <td class="text-right text-danger">-{{fees | dollars}}</td>
        <td class="text-right">{{amount | dollars}}</td>
    </tr>
</template>

<script>
import Currency from '../mixins/Currency';

export default {
    props : ['yearObj'],
    mixins : [Currency],
    name : 'static-year-row',
    data(){
        return {
            year : this.yearObj.year,
            initial : this.yearObj.initial,
            isRetired : this.yearObj.isRetired,
            cost : this.yearObj.cost,
            income : this.yearObj.income,
            growth : this.yearObj.growth,
            fees : this.yearObj.fees,
            amount : this.yearObj.amount,
            growthAmount : this.yearObj.growthAmount
        }
    },
    mounted(){

    },
    methods : {
        overrideYear(event){
            let year = JSON.parse(JSON.stringify(this.$data));
            this.$emit('overrideYear', {...year, cost :  parseFloat(event.target.value)})
        }
    }
}
</script>

<style>
.cost-override {
    padding: 0;
    font-size: 9px;
}
</style>