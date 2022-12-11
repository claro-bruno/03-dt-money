import { HeaderContainer, HeaderContent, NewTransactionsButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import LogoImg from '../../assets/logo-ignite.svg'
import { NewTransactionModal } from '../NewTransactionalModal'
import React, { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function Header() {
  const open = useContextSelector(TransactionsContext, (context) => {
    return { open: context.open, setOpen: context.setOpen }
  })
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImg} alt="" />
        <Dialog.Root open={open.open} onOpenChange={open.setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionsButton>Nova Transação</NewTransactionsButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
