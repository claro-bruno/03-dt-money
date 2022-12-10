import { HeaderContainer, HeaderContent, NewTransactionsButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import LogoImg from '../../assets/logo-ignite.svg'
import { NewTransactionModal } from '../NewTransactionalModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionsButton>Nova Transação</NewTransactionsButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
