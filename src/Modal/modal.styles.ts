import styled from 'styled-components'

type SModalType = {
  show: boolean
}

export const SModal = styled.form<SModalType>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 80vh;

  transform: translate(50%, 50%);

  .wrapper {
    position: relative;
  }

  .close-btn {
    position: absolute;

    top: 30px;
    right: 30px;
  }
`
