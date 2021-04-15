export default {
    methods : {
        convertToCSV(years){
            if (years.length == 0){
                console.log('No years to export')
                return;
            }
            let keys = Object.keys(years[0]);
            var csv = "data:text/csv;charset=utf-8,";
            csv += keys.join(',') + "\n"
            csv += years.map( y => Object.values(y).join(',')).join('\n')
            
            return csv;
        }
    }
}