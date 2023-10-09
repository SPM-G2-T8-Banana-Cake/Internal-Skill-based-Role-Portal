// FUNCTIONS
export const convertDateTime = (date, tzString) => {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  };


// CONSTANTS
export const departments = [
    'Finance',
    'IT',
    'Marketing',
    'HR',
    'Sales', 
    'Design',
    'Product Management',
    'Engineering',
    'Management',
    'Purchasing',
    'Logistics',
    'Quality Management'
]