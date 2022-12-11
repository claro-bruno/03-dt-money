import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionalType,
  TransactionalTypeButton,
} from './styles'
import { api } from '../../lib/axios'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContext } from 'react'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type MewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<MewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: MewTransactionFormInputs) {
    const { description, category, price, type } = data
    // const response = await api.post('transactions', {
    //   description,
    //   category,
    //   price,
    //   type,
    //   createdAt: new Date().toISOString(),
    // })
    await createTransaction({ description, category, type, price })
    reset()
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
            required
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionalType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionalTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} /> Entrada
                  </TransactionalTypeButton>
                  <TransactionalTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} /> Saída
                  </TransactionalTypeButton>
                </TransactionalType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
