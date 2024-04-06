import React, { useState, useEffect } from "react";
import { VStack, HStack, Button, Text, Heading, Container, useToast, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

const Index = () => {
  const workTime = 25 * 60; // 25 minutes
  const breakTime = 5 * 60; // 5 minutes

  const [secondsLeft, setSecondsLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const toast = useToast();

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval);
    }

    if (secondsLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      setIsWorkTime(!isWorkTime);
      setSecondsLeft(isWorkTime ? breakTime : workTime);
      toast({
        title: isWorkTime ? "Time for a break!" : "Back to work!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, isWorkTime, toast, workTime, breakTime]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsWorkTime(true);
    setSecondsLeft(workTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Container centerContent>
      <VStack spacing={8} mt={16}>
        <Heading>Pomodoro Timer</Heading>
        <CircularProgress value={(secondsLeft / (isWorkTime ? workTime : breakTime)) * 100} size="120px" thickness="12px">
          <CircularProgressLabel>{formatTime(secondsLeft)}</CircularProgressLabel>
        </CircularProgress>
        <Text fontSize="xl">{isWorkTime ? "Work Time" : "Break Time"}</Text>
        <HStack>
          <Button leftIcon={isActive ? <FaPause /> : <FaPlay />} onClick={toggle}>
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button leftIcon={<FaSync />} onClick={reset}>
            Reset
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
