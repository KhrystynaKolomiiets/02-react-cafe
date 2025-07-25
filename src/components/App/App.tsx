import { useState } from "react";
import { type VoteType, type Votes } from "../../types/votes";
import CafeInfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";
import VoteOptions from "../VoteOptions/VoteOptions";

import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
export default function App() {
  const defaultVotes: Votes = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  const [votes, setVotes] = useState<Votes>(defaultVotes);
  const handleVote = (type: VoteType) => {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  };
  const resetVotes = () => {
    setVotes(defaultVotes);
  };
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
