function prettyDollars(amount) {
    if (Math.abs(amount) >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)} mil`
    } else {
        return new Intl.NumberFormat('en-us', {
            style: "currency",
            currency: "USD"
        }).format(amount)
    }
}

export default {
    methods : {
        prettyDollars(amount){
            return prettyDollars(amount)
        }
    },
    filters: {
        dollars(value) {
            return prettyDollars(value)
        }
    },
}