import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLocalStorage } from "react-use";

type ApiKeyModal = {
  isOpen: boolean;
  onClose: () => void;
};

export const ApiKeyModal = ({ isOpen, onClose }: ApiKeyModal) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [apiKey, setApiKey] = useLocalStorage("OpenAI_API_Key", "");
  const [inputKey, setInputKey] = useState(apiKey);

  const onSubmitForm = (data: FieldValues) => {
    setApiKey(data.apiKey);
    reset();
    onClose();
  };

  const clearInput = () => {
    setInputKey("");
    setValue("apiKey", "");
  };

  useEffect(() => {
    if (isOpen) {
      setInputKey(apiKey);
    }
  }, [isOpen, apiKey]);

  useEffect(() => {
    setValue("apiKey", inputKey);
  }, [inputKey, setValue]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>API Key</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalBody>
              <Input
                {...register("apiKey")}
                type="password"
                placeholder="Enter your OpenAI API key"
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button variant="ghost" onClick={clearInput}>
                Clear
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
