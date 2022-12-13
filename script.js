const bill = document.querySelector("#bill");
const btnTip = document.querySelectorAll(".tip");
const customTip = document.querySelector("#custom-tip");
const numberOfPeople = document.querySelector("#number-of-people");
const textResultAmount = document.querySelector(".tip-amount-result");
const textResultTotal = document.querySelector(".total-result");

let idSeleccionado;

document.addEventListener("DOMContentLoaded", (e) => {
  for (let i = 0; i < btnTip.length; i++) {
    btnTip[i].setAttribute("data-id", i);
  }
});

btnTip.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnIdSelected = e.target.getAttribute("data-id");
    idSeleccionado = btnIdSelected;
    btnTip.forEach((btn) => {
      if (btn.dataset.id != btnIdSelected) {
        btn.classList.remove("tip-selected");
      } else {
        btn.classList.add("tip-selected");
        customTip.value = "";
      }
    });
  });
});

//* events inputs
bill.addEventListener("input", (e) => {
  bill.value = bill.value.replace(/[^0-9.]/g, "");
});

customTip.addEventListener("input", (e) => {
  customTip.value = customTip.value.replace(/[^0-9]/g, "");
});

numberOfPeople.addEventListener("input", (e) => {
  numberOfPeople.value = numberOfPeople.value.replace(/[^0-9]/g, "");
});

//* events keyups
bill.addEventListener("keyup", (e) => {
  getBillValue();
  sacandoDivision();
  if (
    bill.value != "" &&
    numberOfPeople.value != "" &&
    customTip.value != "" &&
    idSeleccionado != undefined
  ) {
    textResultAmount.textContent = numberToCurrencyToTipAmount(
      getTips(idSeleccionado)
    );
    textResultTotal.textContent = numberToCurrencyToTotal(total());
  } else {
    textResultAmount.textContent = "$0.00";
    textResultTotal.textContent = "$0.00";
  }
});

customTip.addEventListener("keyup", (e) => {
  sacandoDivision();
  if (
    bill.value != "" &&
    numberOfPeople.value != "" &&
    customTip.value != "" &&
    idSeleccionado != undefined
  ) {
    textResultAmount.textContent = numberToCurrencyToTipAmount(
      getTips(idSeleccionado)
    );
    textResultTotal.textContent = numberToCurrencyToTotal(total());
  } else {
    textResultAmount.textContent = "$0.00";
    textResultTotal.textContent = "$0.00";
  }
});

numberOfPeople.addEventListener("keyup", (e) => {
  getPeopleValue();
  sacandoDivision();
  if (
    bill.value != "" &&
    numberOfPeople.value != "" &&
    customTip.value != "" &&
    idSeleccionado != undefined
  ) {
    textResultAmount.textContent = numberToCurrencyToTipAmount(
      getTips(idSeleccionado)
    );
    textResultTotal.textContent = numberToCurrencyToTotal(total());
  } else {
    textResultAmount.textContent = "$0.00";
    textResultTotal.textContent = "$0.00";
  }
});

//* events click
customTip.addEventListener("click", (e) => {
  idSeleccionado = 90;
  textResultAmount.textContent = "$0.00";
  textResultTotal.textContent = "$0.00";
  btnTip.forEach((btn) => {
    btn.classList.remove("tip-selected");
  });
});

btnTip.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (bill.value != "" && numberOfPeople.value != "") {
      textResultAmount.textContent = numberToCurrencyToTipAmount(
        getTips(idSeleccionado)
      );
      textResultTotal.textContent = numberToCurrencyToTotal(total());
    } else {
      textResultAmount.textContent = "$0.00";
      textResultTotal.textContent = "$0.00";
    }
  });
});

const numberToCurrencyToTipAmount = (n) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
};

const numberToCurrencyToTotal = (n) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
};

const getBillValue = () => {
  let valorDeBill = bill.value;
  return valorDeBill;
};

const getPeopleValue = () => {
  let numeroDePersonas = numberOfPeople.value;
  return numeroDePersonas;
};

const getTips = (par) => {
  let porcentaje;

  if (par == 0) {
    porcentaje = 5;
  } else if (par == 1) {
    porcentaje = 10;
  } else if (par == 2) {
    porcentaje = 15;
  } else if (par == 3) {
    porcentaje = 25;
  } else if (par == 4) {
    porcentaje = 50;
  } else if (par == 90) {
    porcentaje = customTip.value;
  }

  let tipAmount = (sacandoDivision() / 100) * porcentaje;
  return tipAmount;
};

function sacandoDivision() {
  let division;
  if (bill.value != "" && numberOfPeople.value != "") {
    division = getBillValue() / getPeopleValue();
  }
  return division;
}

const total = () => {
  let total = sacandoDivision() + getTips(idSeleccionado);
  return total;
};
