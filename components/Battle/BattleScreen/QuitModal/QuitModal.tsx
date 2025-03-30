import {
  ButtonText,
  Heading,
  SubHeading,
} from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Modal, TouchableOpacity, View } from "react-native";
import { styles } from "./QuitModal.styles";

type QuitModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const QuitModal = ({ visible, onClose, onConfirm }: QuitModalProps) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Heading color={colors.PrimaryWhite}>Quit Battle?</Heading>
          <SubHeading
            color={colors.PrimaryWhite}
            style={{ marginTop: 10, marginBottom: 20 }}
          >
            Are you sure you want to quit? All progress will be lost.
          </SubHeading>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <ButtonText color={colors.PrimaryWhite}>Cancel</ButtonText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onConfirm}
            >
              <ButtonText color={colors.PrimaryWhite}>Quit</ButtonText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
