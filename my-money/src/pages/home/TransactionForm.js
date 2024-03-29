import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

const TransactionForm = ({ uid }) => {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addDocument, response } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log( uid, name, amount, response.success )
        addDocument({ uid: uid, name, amount })
        setName('')
        setAmount('')
    }

    useEffect(() => {
        if(response.success) {
            setName('')
            setAmount('')
        }
    }, [response.success])

  return (
    <>
        <h3>Add a transaction</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Name of transaction:</span>
                <input
                    type="text" 
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label>
                <span>Amount ($):</span>
                <input
                    type="number"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
            </label>
            <button className='btn'>Add transaction</button>
        </form>
    </>
  )
}

export default TransactionForm