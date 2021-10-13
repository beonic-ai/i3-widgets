const entriesExpr = {
  metric: "counters",
  value: {
    counter: "entries",
  },
};

const entriesLastYearExpr = {
  ...entriesExpr,
  dateRangeOverride: {
    localStartDate: {
      unit: "Year",
      value: -1,
      relativeTo: "StartDate",
    },
    localEndDate: { unit: "Year", value: -1, relativeTo: "EndDate" },
  },
};

const entriesTwoYearsAgoExpr = {
  ...entriesExpr,
  dateRangeOverride: {
    localStartDate: {
      unit: "Year",
      value: -2,
      relativeTo: "StartDate",
    },
    localEndDate: { unit: "Year", value: -2, relativeTo: "EndDate" },
  },
};

const deltaLastYearExpr = {
  $divide: [
    { $subtract: [entriesExpr, entriesLastYearExpr] },
    entriesLastYearExpr,
  ],
};

const deltaTwoYearsAgoExpr = {
  $divide: [
    { $subtract: [entriesExpr, entriesTwoYearsAgoExpr] },
    entriesTwoYearsAgoExpr,
  ],
};

const sensorColumn = {
  dimension: {
    key: "sensorId",
  },
  sortSpecification: {
    ascending: true,
    priority: 2,
  },
};

const dailyColumn = {
  dimension: {
    timeBasedDimension: "Daily",
  },
  sortSpecification: {
    ascending: true,
    priority: 1,
  },
};

const monthlyColumn = {
  dimension: {
    timeBasedDimension: "Monthly",
  },
  sortSpecification: {
    ascending: true,
    priority: 1,
  },
};

const doorByDay = {
  visualisation: {
    title: "Entries by door by day",
    description: "Entries by door by day",
    type: "Table",
    tableSettings: null,
  },
  filterOverrides: null,
  columnNames: [
    "Day",
    "Door",
    "Entries this year",
    "Entries last year",
    "Delta % from last year",
    "Entries 2 years ago",
    "Delta % from 2 years ago",
  ],
  rowSets: [
    {
      columns: [
        dailyColumn,
        sensorColumn,
        {
          numericExpression: entriesExpr,
        },
        {
          numericExpression: entriesLastYearExpr,
        },
        {
          unit: "percentage",
          numericExpression: deltaLastYearExpr,
        },
        {
          numericExpression: entriesTwoYearsAgoExpr,
        },
        {
          unit: "percentage",
          numericExpression: deltaTwoYearsAgoExpr,
        },
      ],
    },
  ],
};

const byDay = {
  visualisation: {
    title: "Entries by day",
    description: "Entries by day",
    type: "Table",
    tableSettings: null,
  },
  filterOverrides: null,
  columnNames: [
    "Day",
    "Entries this year",
    "Entries last year",
    "Delta % from last year",
    "Entries 2 years ago",
    "Delta % from 2 years ago",
  ],
  rowSets: [
    {
      columns: [
        dailyColumn,
        {
          numericExpression: entriesExpr,
        },
        {
          numericExpression: entriesLastYearExpr,
        },
        {
          unit: "percentage",
          numericExpression: deltaLastYearExpr,
        },
        {
          numericExpression: entriesTwoYearsAgoExpr,
        },
        {
          unit: "percentage",
          numericExpression: deltaTwoYearsAgoExpr,
        },
      ],
    },
  ],
};

const doorByMonth = {
  visualisation: {
    title: "Entries by door by month",
    description: "Entries by door by month",
    type: "Table",
    tableSettings: null,
  },
  filterOverrides: null,
  columnNames: [
    "Month",
    "Door",
    "Entries this year",
    "Entries last year",
    "Delta % from last year",
    "Entries 2 years ago",
    "Delta % from 2 years ago",
  ],
  rowSets: [
    {
      columns: [
        monthlyColumn,
        sensorColumn,
        {
          numericExpression: entriesExpr,
        },
        {
          numericExpression: entriesLastYearExpr,
        },
        {
          unit: "percentage",
          numericExpression: deltaLastYearExpr,
        },
        {
          numericExpression: entriesTwoYearsAgoExpr,
        },
        {
          unit: "percentage",
          numericExpression: deltaTwoYearsAgoExpr,
        },
      ],
    },
  ],
};

console.log("door by day:");
console.log(JSON.stringify(doorByDay, null, 2));
console.log();

console.log("by day:");
console.log(JSON.stringify(byDay, null, 2));
console.log();

console.log("door by month:");
console.log(JSON.stringify(doorByMonth, null, 2));
