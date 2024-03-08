import './index.css'
import {v4} from 'uuid'
import {Component} from 'react'
import TransectionItems from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onDeleteItmem = id => {
    const {transactionList} = this.state
    const filteredItems = transactionList.filter(eachItem => eachItem.id !== id)
    this.setState({transactionList: filteredItems})
  }

  addTransectionDetails = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransation => eachTransation.optionId === optionId,
    )
    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getIncome = () => {
    const {transactionList} = this.state

    let incomeAmount = 0

    transactionList.forEach(eachTransation => {
      if (eachTransation.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransation.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionList} = this.state

    let expensesAmount = 0

    transactionList.forEach(eachTransation => {
      if (eachTransation.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransation.amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionList} = this.state

    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransation => {
      if (eachTransation.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransation.amount
      } else {
        expensesAmount += eachTransation.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {transactionList, titleInput, amountInput, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpenses()

    return (
      <div className="main-background-container">
        <div className="background-container">
          <div className="user-header-container">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your
              <span className="span-element"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
          />
          <div className="transaction-history-container">
            <form
              className="transaction-container"
              onSubmit={this.addTransectionDetails}
            >
              <h1 className="heading">Add Transaction</h1>
              <label className="label-elelment" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                id="title"
                type="text"
                placeholder="TITLE"
                className="input-element"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label className="label-elelment" htmlFor="amount">
                AMOUNT
              </label>
              <br />
              <input
                id="amount"
                type="text"
                placeholder="AMOUNT"
                className="input-element"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <label className="label-elelment">TYPE</label>
              <br />
              <select
                className="input-element"
                onChange={this.onChangeOptionId}
                value={optionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option
                    className="option-background"
                    value={eachOption.optionId}
                    key={eachOption.optionId}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="heading">History</h1>
              <ul className="unorder-list-container">
                <li className="header-container">
                  <p className="header">Title</p>
                  <p className="header">Amount</p>
                  <p className="header">Type</p>
                </li>
                {transactionList.map(eachTransation => (
                  <TransectionItems
                    transactionDetails={eachTransation}
                    key={eachTransation.id}
                    onDeleteItmem={this.onDeleteItmem}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
