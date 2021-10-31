import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import React, { Children } from 'react';
import Paper from '@mui/material/Paper';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface CarouselProps {
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const maxLen = Children.count(props.children);

  return <Paper elevation={0}>
    <AutoPlaySwipeableViews
      axis='x'
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
      interval={10000}
    >
      {props.children}
    </AutoPlaySwipeableViews>
    <MobileStepper
      steps={maxLen}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxLen - 1}
        >
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          PREVIOUS
        </Button>
      }
    />
  </Paper>;
}

export default Carousel;
