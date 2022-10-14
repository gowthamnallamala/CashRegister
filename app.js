const hideShowCalc = document.getElementById("hide");
const inputBillAmt = document.querySelector("#bill-amount");
const billErrorMessage = document.querySelector(".err-msg");
const inputCashAmount = document.querySelector("#csh-amt");
const calculateButton = document.querySelector("#cal-btn");
const refundAmount_errorMessage = document.querySelector(".rfd-amt-err");
const table = document.getElementById("notes-table");
const notesCount = document.getElementById("notes-count");
const nextButton = document.querySelector("#nxt-btn");

hideShowCalc.style.visibility = "hidden";//initally cash amount elemts will be hidden till next button is clicked

var notes = [2000, 500, 100, 50, 10, 5, 1];

for (var i = 0; i < notes.length; i++) {
    //added dynamic table according to notes to display notes
  const notesTableRow = document.createElement("tr");
  const notesTableData = document.createElement("td");
  var value = document.createTextNode(notes[i]);
  notesTableData.appendChild(value);
  notesTableRow.appendChild(notesTableData);
  table.appendChild(notesTableRow);
    //added dynamic table for notes count and initially given a value 0
  const noteCountTableRow = document.createElement("tr");
  const noteCountTableData = document.createElement("td");
  noteCountTableData.classList.add("notes"); //added a class list to notes count table so we can add notes value after calculation
  var notecount = document.createTextNode("0");
  noteCountTableData.appendChild(notecount);
  noteCountTableRow.appendChild(noteCountTableData);
  notesCount.appendChild(noteCountTableRow);
}

//handle for onclicking next button

function nextButtonClickHandler() {
//validation value is valid or not
  if (inputBillAmt.value == "" || inputBillAmt.value <= 0) {
    hideShowCalc.style.visibility = "hidden";
    billErrorMessage.innerText = "Please enter value";
  } else if (inputBillAmt.value >= 0) {//if value is valid 
    billErrorMessage.innerText = "";//error message we set in invalid if setting it to none in valid state
    hideShowCalc.style.visibility = "visible";
  }
}

function calculateButtonClickHandler() {
  console.log("Clicked Calculate button");
  console.log("calculate value",inputCashAmount.value)

  if(inputCashAmount.value == ''){
    refundAmount_errorMessage.innerText ="Please enter cash amount to calculate.";
  }
  var billAmount = parseInt(inputBillAmt.value);
  var cashAmount = parseInt(inputCashAmount.value);
  console.log(typeof(cashAmount));
  var refundAmount = billAmount - cashAmount;
  var notesCountStore;
  if (billAmount > cashAmount && cashAmount>=0) {
    refundAmount_errorMessage.classList.remove("rfd-amt");
    refundAmount_errorMessage.classList.add("rfd-amt-err");
    refundAmount_errorMessage.innerText =
      "You need " +
      refundAmount +
      " more cash from Customer to complete bill payment.";
  }else if (billAmount == cashAmount) {
    refundAmount_errorMessage.classList.remove("rfd-amt-err");
    refundAmount_errorMessage.innerText = "Refund amount is: " + refundAmount;
  }else if(cashAmount <=0 || cashAmount == ''){
    refundAmount_errorMessage.classList.add("rfd-amt-err");
 refundAmount_errorMessage.innerText = "Please enter value greater than 0";
}
  else if (billAmount < cashAmount && cashAmount>0) {
    refundAmount= cashAmount - billAmount;
    refundAmount_errorMessage.classList.remove("rfd-amt-err")
    refundAmount_errorMessage.classList.add("rfd-amt");
    refundAmount_errorMessage.innerText = "Refund amount is: " + refundAmount;
    notesCountStore= notesCalculation(refundAmount);
    var notesTableNode = document.querySelectorAll(".notes");
    notesTableNode.forEach((item, idx) => {
        item.innerText = notesCountStore[idx];
    })
    
  }
}

function notesCalculation(refundAmount){
    var countnotes=0;
    var countArr=[];
    for(var i=0;i<notes.length;i++){
        countnotes=(refundAmount/notes[i]);//checking quotient from quotient we will have a note count
        countArr[i]=parseInt(countnotes);

        countnotes=parseInt(countnotes)
        if( countnotes >=1)(
            refundAmount=refundAmount%notes[i]
        )
    }
    return countArr;
}
nextButton.addEventListener("click", nextButtonClickHandler);
calculateButton.addEventListener("click", calculateButtonClickHandler);