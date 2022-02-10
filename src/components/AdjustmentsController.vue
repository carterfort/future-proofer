<template>
    <div>
            <b-form-group
                label="How many years do you have left?"
            >
                <b-form-input v-model="totalYearsLeft" type="number"></b-form-input>
            </b-form-group>
            <b-form-group
                label="Drag the slider to set working vs. retirement years"
                label-for="input-1"
            >
            <input 
                class="form-control"
                type="range" 
                :max="totalYearsLeft" 
                step="1" 
                v-model="targetWorkingYears" 
                @input="setTargetRetirementYears" 
            />
            </b-form-group>

            <hr/>
            <b-form-group
                label="How many more years will you work?"
                label-for="input-1"
            >
            <b-form-input v-model="targetWorkingYears" type="number"></b-form-input>
            </b-form-group>
            <b-form-group
                label="How many years will you be retired?"
                label-for="input-1"
            >
                <b-form-input v-model="targetRetirementYears" type="number"></b-form-input>
            </b-form-group>

        <div class="btn-group btn-group-sm mb-2">
            <button
            @click="useVariableAnnualRetirementCosts = true"
            type="button" class="btn"
            :class="{
                'btn-primary' : useVariableAnnualRetirementCosts,
                'btn-outline-primary' : !useVariableAnnualRetirementCosts
                }"
            >
                Variable Annual Costs
            </button>
            <button
            @click="useVariableAnnualRetirementCosts = false"
            type="button" class="btn"
            :class="{
                'btn-primary' : !useVariableAnnualRetirementCosts,
                'btn-outline-primary' : useVariableAnnualRetirementCosts
                }"
            >
                Fixed Annual Costs
            </button>
        </div>
        
        <div v-if="useVariableAnnualRetirementCosts">
            <b-form-group
                label="What percentage of your principal will you spend once retired?"
                label-for="input-1"
            >
                <b-form-input v-model="variableAnnualRetirementCost" type="number"></b-form-input>
            </b-form-group>
        </div>
        
        <b-form-group
            v-else
            :label='"What will you spend a year once retired? ("+ prettyDollars(annualRetirementCost) +")"'
            label-for="input-1"
        >
            <b-form-input v-model="annualRetirementCost"></b-form-input>
        </b-form-group>

        <b-form-group
            label="What should the average annual return on investments be? (%)"
            label-for="input-1"
        >
            <b-form-input v-model="averageAnnualReturn" type="number"></b-form-input>
        </b-form-group>
        <b-form-group
            :label='"How much are you starting with? (" + startingAmountDollars + ")"'
            label-for="input-1"
        >
            <b-form-input v-model="startingAmount"></b-form-input>
        </b-form-group>
        <b-form-group
            label="How much will you save each year you're working? ($)"
            label-for="input-1"
        >
            <b-form-input v-model="annualInputAmount"></b-form-input>
        </b-form-group>
        <b-form-group
            label="How much will you increase savings per year? (%)"
            label-for="input-1"
        >
            <b-form-input 
                v-model="savingsIncreasePercentage"
                type="number"
                step="0.5"
            ></b-form-input>
        </b-form-group>
        <b-form-group
            label="What are you paying in management fees? (%)"
            label-for="input-1"
        >
            <b-form-input v-model="managementFees"></b-form-input>
        </b-form-group>
    </div>
</template>

<script>

import Currency from '../mixins/Currency'

export default {
    props : [
        'values'
    ],
    mixins : [
        Currency
    ],
    watch : {
        targetWorkingYears(){
            this.$emit('update', {field: 'targetWorkingYears', value: this.targetWorkingYears} );
            this.setTotalYearsLeft();
        },
        targetRetirementYears(){
            this.$emit('update', {field: 'targetRetirementYears', value: this.targetRetirementYears} );
            this.setTotalYearsLeft();
        },
        annualRetirementCost(){
            this.$emit('update', {field: 'annualRetirementCost', value: this.annualRetirementCost} );
        },
        averageAnnualReturn(){
            this.$emit('update', {field: 'averageAnnualReturn', value: this.averageAnnualReturn} );
        },
        startingAmount(){
            this.$emit('update', {field: 'startingAmount', value: this.startingAmount} );
        },
        annualInputAmount(){
            this.$emit('update', {field: 'annualInputAmount', value: this.annualInputAmount} );
        },
        managementFees(){
            this.$emit('update', {field: 'managementFees', value: this.managementFees} );
        },
        variableAnnualRetirementCost(){
            this.$emit('update', {field: 'variableAnnualRetirementCost', value: this.variableAnnualRetirementCost} );
        },
        savingsIncreasePercentage(){
            this.$emit('update', {field: 'savingsIncreasePercentage', value: this.savingsIncreasePercentage});
        },
        totalYearsLeft(){
            this.setTargetRetirementYears()
        },
        useVariableAnnualRetirementCosts(){
            if (! this.useVariableAnnualRetirementCosts){
                this.variableAnnualRetirementCost = false;
            } else {
                this.variableAnnualRetirementCost = 4;
            }
        }
    },
    computed : {
            startingAmountDollars(){
                return this.prettyDollars(this.startingAmount)
        }
    },
    data(){
        return {
            'targetWorkingYears' : this.values['targetWorkingYears'],
            'targetRetirementYears' : this.values['targetRetirementYears'],
            'annualRetirementCost' : this.values['annualRetirementCost'],
            'averageAnnualReturn' : this.values['averageAnnualReturn'],
            'startingAmount' : this.values['startingAmount'],
            'annualInputAmount' : this.values['annualInputAmount'],
            'managementFees' : this.values['managementFees'],
            'variableAnnualRetirementCost' : this.values['variableAnnualRetirementCost'],
            'savingsIncreasePercentage' : this.values['savingsIncreasePercentage'],
            totalYearsLeft : 0,
            useVariableAnnualRetirementCosts : !!this.values['variableAnnualRetirementCost'],
        }
    },
    mounted(){
        this.setTotalYearsLeft();
    },
    methods : {
        setTargetRetirementYears(){
            this.targetRetirementYears = this.totalYearsLeft - this.targetWorkingYears;
        },
        setTotalYearsLeft(){
            this.totalYearsLeft = parseInt(this.targetRetirementYears) + parseInt(this.targetWorkingYears);
        }
    }
}
</script>

<style>
</style>