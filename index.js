/* Your Code Here */

function createEmployeeRecord(employeeRecord) {
    return {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(dateStamp) {
    let TimeIn = {
        type: "TimeIn",
        date: dateStamp.split(" ")[0],
        hour: parseInt(dateStamp.split(" ")[1])
    }
    this.timeInEvents.push(TimeIn)
    return this
}

function createTimeOutEvent(dateStamp) {
    let TimeOut = {
        type: "TimeOut",
        date: dateStamp.split(" ")[0],
        hour: parseInt(dateStamp.split(" ")[1])
    }
    this.timeOutEvents.push(TimeOut)
    return this
}

function hoursWorkedOnDate(date) {
    // find timeInEvent and timeOutEvent with matching date
    let timeIn = this.timeInEvents.find(e => {return e.date === date})
    let timeOut = this.timeOutEvents.find(e => {return e.date === date})
    // subtract and divide to get 2 instead of 200
    return (timeOut.hour - timeIn.hour) / 100 
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(records, name) {
    return records.find(e => {return e.firstName === name})
}

function calculatePayroll(employees) {
    let emlpoyeesTotal = employees.map(e => {
        return allWagesFor.call(e)
    })
    let payroll = emlpoyeesTotal.reduce((total, wage) => {
        return wage + total
    })
    return payroll
}