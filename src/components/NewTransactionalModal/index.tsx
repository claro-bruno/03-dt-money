import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionalType,
  TransactionalTypeButton,
} from './styles'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form>
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />
          <TransactionalType>
            <TransactionalTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} /> Entrada
            </TransactionalTypeButton>
            <TransactionalTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} /> Saída
            </TransactionalTypeButton>
          </TransactionalType>
          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
