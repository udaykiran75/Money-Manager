import './index.css'

const TransectionItems = props => {
  const {transactionDetails, onDeleteItmem} = props
  const {id, title, amount, type} = transactionDetails

  const deleteHistory = () => {
    onDeleteItmem(id)
  }

  return (
    <li className="list-item-container">
      <div className="header-names-container">
        <p className="header-names">{title}</p>
        <p className="header-names">Rs {amount}</p>
        <p className="header-names">{type}</p>
      </div>
      <button
        className="delete-btn"
        onClick={deleteHistory}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}
export default TransectionItems
