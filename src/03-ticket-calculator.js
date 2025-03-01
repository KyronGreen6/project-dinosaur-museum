/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  //if ticketType doesn't exist or the value of tickeType doen't exist in the tickerData return this data message
  // Checking if the ticket type exists in the ticket data.
  if(!ticketData[ticketInfo.ticketType]){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  } 
  // Checking if the entrant type exists in the ticket data.
  if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
    // Initializing the ticket price with the base price.
    ticketPrice = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
    // Iterating through the extras and adding their prices to the ticket.
    for(i = 0; i < ticketInfo.extras.length; i++){;
    addedExtras = ticketInfo.extras[i];
    // Checking if the extra type exists in the ticket data.
    if(!ticketData.extras[addedExtras]){
      return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
    }
     // Adding the extra's price to the ticket price.
    ticketPrice = ticketPrice + ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType]
  }
    // Returning the total ticket price in cents.
    return ticketPrice
    }
  

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  // Initializing the purchase total and the receipt string.
  let purchaseTotal = 0
  let receipt = ""

  // Iterating through each purchase.
  for(let i = 0; i < purchases.length; i++){
  // Calculating the ticket price for the current purchase.
  ticketPrice = calculateTicketPrice(ticketData, purchases[i])

  // Checking if the ticketPrice is a string (indicating an error).
  if(typeof ticketPrice === "string"){
    return ticketPrice
  } else {
     // Adding the ticket price to the purchase total.
    purchaseTotal += ticketPrice

     // Capitalizing the entrant type and ticket type.
    const capitalizedEntrantType = purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)
    const capitalizedTicketType = purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1)

    // Formatting the extras.
    formattedExtras = purchases[i].extras.map(extra => extra[0].toUpperCase() + extra.slice(1) + ' Access').join(", ")

    // Generating the receipt line for the current purchase.
    if(purchases[i].extras.length === 0){
      receipt += `${capitalizedEntrantType} ${capitalizedTicketType} Admission: $${(ticketPrice/100).toFixed(2)}\n`
    } else {
      receipt += `${capitalizedEntrantType} ${capitalizedTicketType} Admission: $${(ticketPrice/100).toFixed(2)} (${formattedExtras})\n`
    }
  }
 
}
// Generating and returning the full receipt.
return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${(purchaseTotal/100).toFixed(2)}`
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
