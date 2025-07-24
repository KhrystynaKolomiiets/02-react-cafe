import { useState } from "react";
import { type VoteType } from "../../types/votes";
import CafeInfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";
import VoteOptions from "../VoteOptions/VoteOptions";
import { type Vote } from "../../types/votes";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
export default function App() {
  const defaultVotes: Vote = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  const [votes, setVotes] = useState<Vote>(defaultVotes);
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
      {totalVotes > 0 ? (
        <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={true} />
      ) : (
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={false}
        />
      )}
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
