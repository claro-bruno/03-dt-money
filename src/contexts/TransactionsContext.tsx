import React, { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  open: boolean
  setOpen: (open: boolean) => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [open, setOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'asc',
        q: query,
      },
    })
    // const url = new URL('/transactions')
    // if (query) {
    //   url.searchParams.append('q', query)
    // }
    // const response = await fetch(url)
    // const data = await response.json()

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data
      const response = await api.post('transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date().toISOString(),
      })

      setTransactions((state) => [response.data, ...state])
      setOpen(false)
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])
  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        open,
        setOpen,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
