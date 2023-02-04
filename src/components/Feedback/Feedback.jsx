import { Component, useState } from 'react';
import Notification from './Notification/Notification';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbakOptions';
import Statistics from './Statistics/Statistics';

export default function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackLabels = ['good', 'neutral', 'bad'];
  const totalFeedbacksQuantity = good + neutral + bad;

  const handleBtnClick = event => {
    const value = event.target.value;
    switch (value) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        console.log(`No case for such event: ${value}`);
    }
  };

  const countPositiveFeedbackPercentage = totalFeedbacksQuantity => {
    return `${Math.round((good / totalFeedbacksQuantity) * 1000) / 10}%`;
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbackLabels}
          onLeaveFeedback={handleBtnClick}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {totalFeedbacksQuantity ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            options={feedbackLabels}
            total={totalFeedbacksQuantity}
            positivePercentage={countPositiveFeedbackPercentage(
              totalFeedbacksQuantity
            )}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
}
