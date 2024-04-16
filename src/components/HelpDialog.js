import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useAtom } from 'jotai';
import { translateNewLine } from './CommonFunc';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

import {
  helpDialogOpenAtom
} from './../components/Atoms';

const HelpDialog = (props) => {
  const [helpDialogOpen, setHelpDialogOpen] = useAtom(helpDialogOpenAtom);
  const [activeStep, setActiveStep] = useState(0);

  const handleDisagree = () => {
    setHelpDialogOpen(false);
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Let's set some goals",
      description:
        `1.目標登録タブを選択する
      2.中央のマス目に目標を書く
      3.目標達成に必要なことを周囲の8マスに書く
      4.外側のマンダラには中央の目標実現について具体的な施策を書く
      5.目標を保存する`,
    },
    {
      label: "Register your achievements!",
      description:
        `1.実績入力タブを選択する
      2.達成度に応じてマスの色を変更する
      3.目標を保存する`,
    },
    {
      label: "Let's check the growth",
      description:
        `1.成長記録タブを選択する
      2.比較したい年月を選択する
      3.達成度100%を目指そう！`,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      open={helpDialogOpen}
      onClose={handleDisagree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ width: 500 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                  }}
                >{translateNewLine(step.description)}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    {index === steps.length - 1
                      ?
                      ""
                      :
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                    }
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Dialog>
  );
}
export default HelpDialog;