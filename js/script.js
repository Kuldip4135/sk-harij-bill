const recentMoney = document.getElementById("recentMoney");
const laborMoney = document.getElementById("laborMoney");
const advanceMoney = document.getElementById("advanceMoney");
const customerName = document.getElementById("customerName");
const customerVillageName = document.getElementById("customerVillageName");
const bill = document.querySelector(".bill");
bill.style.display = "none";
let index = 1;

//to convert english digits to gujarati
function translateNumerals(input, target) {
  var systems = {
      devanagari: 2406,
      tamil: 3046,
      kannada: 3302,
      telugu: 3174,
      marathi: 2406,
      malayalam: 3430,
      oriya: 2918,
      gurmukhi: 2662,
      nagari: 2534,
      gujarati: 2790,
    },
    zero = 48, // char code for Arabic zero
    nine = 57, // char code for Arabic nine
    offset = (systems[target.toLowerCase()] || zero) - zero,
    output = input.toString().split(""),
    i,
    l = output.length,
    cc;

  for (i = 0; i < l; i++) {
    cc = output[i].charCodeAt(0);
    if (cc >= zero && cc <= nine) {
      output[i] = String.fromCharCode(cc + offset);
    }
  }
  return output.join("");
}

//dynaic date
let date = new Date().toLocaleDateString();
let dateInGuj = translateNumerals(date, "Gujarati");
document.querySelector(".current-date").innerText = `તારીખ :- ${dateInGuj}`;

//Append dynamically value to bill
const customerForm = document.getElementById("customerForm");

customerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelector(
    ".customer-name-title"
  ).innerText = `નામ :- ${customerName.value}`;
  document.querySelector(
    ".customer-village-title"
  ).innerText = `ગામ :- ${customerVillageName.value}`;

  alert("ગ્રાહકનું નામ સફળતાપૂર્વક ઉમેરવામાં આવ્યું છે");
});

//Add vegetables to bill
const vegetableBillForm = document.getElementById("vegetableBillForm");

vegetableBillForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //for index
  const vegetableIndex = document.querySelector(".vegetableIndex");
  const indexNumber = document.createElement("h5");
  indexNumber.innerText = translateNumerals(index, "Gujarati");
  vegetableIndex.appendChild(indexNumber);

  //for vegetable name
  const vegetableName = document.createElement("h5");
  vegetableName.innerText = document.getElementById("vegetableName").value;
  document.querySelector(".vegetableNameDiv").appendChild(vegetableName);
  document.getElementById("vegetableName").value = "";

  //for vegetable weight
  const vegetableWeight = document.createElement("h5");
  vegetableWeight.innerText = parseFloat(
    document.getElementById("vegetableKG").value
  );
  const vegetableWeightNumber = parseFloat(vegetableWeight.innerText);

  //for vegetable price
  const vegetablePriceForKG = document.createElement("h5");
  vegetablePriceForKG.innerText = parseFloat(
    document.getElementById("vegetablePriceForKG").value
  );
  const vegetablePriceForKGNumber = parseFloat(vegetablePriceForKG.innerText);

  //for total price of one vegetable
  const vegetableItemPrice = document.createElement("h5");
  vegetableItemPrice.classList.add("vegetable-item-price");
  vegetableItemPrice.style.display = "none";
  const vegetableItemPriceEng = (vegetableItemPrice.innerText = parseFloat(
    parseFloat(vegetableWeightNumber) * parseFloat(vegetablePriceForKGNumber)
  ));

  //show everything in gujarati
  //vegetbale weight in gujarati
  const vegetableWeightNumberGuj = translateNumerals(
    vegetableWeightNumber,
    "Gujarati"
  );
  const h5Weight = document.createElement("h5");
  h5Weight.innerText = vegetableWeightNumberGuj;
  document.querySelector(".vegetableKGDiv").appendChild(h5Weight);
  document.getElementById("vegetableKG").value = "";

  //vegetbale price for kg in gujarati
  const vegetablePriceForKGNumberGuj = translateNumerals(
    vegetablePriceForKGNumber,
    "Gujarati"
  );
  const h5KGPrice = document.createElement("h5");
  h5KGPrice.innerText = vegetablePriceForKGNumberGuj;
  document.querySelector(".vegetablePriceForKGDiv").appendChild(h5KGPrice);
  document.getElementById("vegetablePriceForKG").value = "";

  //for total price of one vegetable
  const vegetableItemPriceGuj = translateNumerals(
    vegetableItemPriceEng,
    "Gujarati"
  );
  const h5Price = document.createElement("h5");
  h5Price.innerText = vegetableItemPriceGuj;
  document.querySelector(".vegetableItemPricesDiv").appendChild(h5Price);
  document
    .querySelector(".vegetableItemPricesDiv")
    .appendChild(vegetableItemPrice);

  index++;
  alert("શાકભાજી વિગતો સફળતાપૂર્વક ઉમેરવામાં આવી છે");
});

//prevnt from submiting form
const extraMoneyForm = document.querySelector(".extraMoneyForm");
extraMoneyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("મજૂરી પૈસા અને છેલ્લા બિલ ના બાકી ના પૈસા ઉમેરવામાં આવ્યા છે");
});

//show total
const calculateTotalBtn = document.getElementById("calculateTotal");
calculateTotalBtn.addEventListener("click", () => {
  bill.style.display = "initial";
  const total = [];
  const items = document.querySelectorAll(".vegetable-item-price");

  items.forEach((item) => {
    total.push(parseFloat(item.textContent));
  });

  const totalMoney = total.reduce((total, item) => {
    return (total += item);
  }, 0);

  let finalMoney = parseFloat(totalMoney.toFixed(2));
  let totalPrice =
    parseFloat(laborMoney.value) +
    parseFloat(recentMoney.value) +
    finalMoney -
    parseFloat(advanceMoney.value);

  let finalMoneyGuj = translateNumerals(finalMoney, "Gujarati");

  document.querySelector(".subtotal-price").innerText = finalMoneyGuj;

  document.querySelector(".labor-price").innerText = translateNumerals(
    parseFloat(laborMoney.value),
    "Gujarati"
  );

  document.querySelector(".recentMoney-price").innerText = translateNumerals(
    parseFloat(recentMoney.value),
    "Gujarati"
  );

  document.querySelector(".advanceMoney-price").innerText = translateNumerals(
    parseFloat(advanceMoney.value),
    "Gujarati"
  );

  document.querySelector(".total-price").innerText = translateNumerals(
    totalPrice,
    "Gujarati"
  );
});

let pdf_modifier = {
  margin: 0.5,
  filename: `SK હારીજ બિલ-- ${dateInGuj}`,
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 3 },
  jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
};

window.onload = function () {
  document.getElementById("downloadBill").addEventListener("click", () => {
    const bill = this.document.querySelector(".bill");
    html2pdf().from(bill).set(pdf_modifier).save();
    alert("બિલ સફળતાપૂર્વક ડાઉનલોડ કરવામાં આવ્યું છે");
  });
};
