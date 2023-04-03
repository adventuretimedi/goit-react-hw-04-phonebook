# goit-react-hw-04-phonebook
// import { useState } from 'react';
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

// E:this.setState(prevState) --> setGood(Good)
!remember неявне повернення const countTotalFeedback = () => good + neutral + bad;
