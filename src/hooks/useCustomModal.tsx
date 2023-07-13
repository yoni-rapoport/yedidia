import CustomModal from "../components/Modal/CustomModal"
import { save } from "../utils/helpers"
import useToggle from "./useToggle"

export default function useCustomModal(
  modalTitle: string,
  componentInsideModal: JSX.Element,
  onSave: () => void
) {
  const { isOpen, setClose, setOpen } = useToggle()

  const component = (
    <CustomModal
      open={isOpen}
      handleClose={setClose}
      save={() => {
        onSave()
        setClose()
      }}
      modalTitle={modalTitle}
    >
      {componentInsideModal}
    </CustomModal>
  )

  const returnValue: [JSX.Element, () => void] = [component, setOpen]

  return returnValue
}
