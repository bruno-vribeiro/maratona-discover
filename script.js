const Modal={
     open(){
    //a brir o modal
    //colocar o active
    document.querySelector(".modal-overlay")
    .classList
    .add("active")
}, close(){
    //fecha
    document.querySelector(".modal-overlay")
    .classList
    .remove("active")
}
}

const translation = [
{
    
    description: "luz",
    amount: -50000,
    date: "23/01/2021",
},
{
    
    description: "Website",
    amount: 500000,
    date: "23/01/2021",
},
{
    
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
}
]

const Translation ={
    all: translation,
    add(translation){
        Translation.all.push(translation)
        App.reload()
    
    },
    remove(index) {
        Translation.all.splice(index, 1)
        App.reload()
    },
    incomes(){
        let income = 0;
        //pegar todas as transações
        // para cada transação
        Translation.all.forEach(translation => {
            //se ela for maior que zero
            if(translation.amount > 0){
                //soma a uma variavel e retorna a variavel
                income = income + translation.amount;
            }
        })
        return income
    },

         expenses(){
        
            let expense = 0;
            //pegar todas as transações
            // para cada transação
            Translation.all.forEach(translation => {
                //se ela for maior que zero
                if(translation.amount < 0){
                    //soma a uma variavel e retorna a variavel
                    expense = expense + translation.amount;
                }
            })
            return expense;
        
        },        
    total(){
        return Translation.incomes() + Translation.expenses();
    }
}

//eu preciso substituir os meus dados
//no js
const DOM = {
    translationsContainer:document.querySelector("#table tbody"),
    addTransaction(translation, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransition(translation)
        DOM.translationsContainer.append(tr)
    },
    innerHTMLTransition(translation){
        const CSSClass = translation.amount > 0 ? "income" :
         "expense"

         const amount = Utils.formatCurrency(translation.amount)
 
        const html = `
        
        <td class="description">${translation.description}</td>
        <td class=${CSSClass}>${amount}</td>
        <td class="data">${translation.date}</td>
        <td> <img src="assets/minus.svg" </td>
    `
    return html
    },

    updateBalance(){
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrency(Translation.incomes())
        document
            .getElementById("expenseDisplay")
            .innerHTML = Utils.formatCurrency(Translation.expenses())
        document
            .getElementById("totalDisplay")
            .innerHTML = Utils.formatCurrency(Translation.total())
    },
clearTranslations() {
    DOM.translationsContainer.innerHTML = ""
}
}
const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const Form ={
    submit(event){
        event.preventDefault()
    }
}

const App = {
    init() {
        Translation.all.forEach(function (transaction){
            DOM.addTransaction(transaction)
        })
         DOM.updateBalance()    
         
    },
    reload () {
        DOM.clearTranslations()
        App.init()
    },
}
App.init()
Translation.remove(0)

