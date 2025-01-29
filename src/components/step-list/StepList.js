import Step from "../step/Step";
import styles from "./step-list.module.scss";

const StepList = () => {
  return (
    <ol className={styles.stepList} role="list">
      <li>
        <Step
          number={1}
          title="Propose Values"
          description={
            "Propose a value that you feel is important and / or view the values others have explored"
          }
          stats={"435 Values Proposed"}
          statImageSrc="/images/steps/propose.svg"
        />
      </li>
      <li>
        <Step
          number={2}
          title="Vote with ETH"
          description={
            "Vote on proposed values vying for depositing ETH or against, and pay a small fee to the value pool"
          }
          stats={"12.8889 ETH in votes"}
          statImageSrc="/images/steps/vote.svg"
        />
      </li>
      <li>
        <Step
          number={3}
          title={"Earn Rewards"}
          description={
            "As more people vote on the same value, your shares accrue a portion of their fees"
          }
          stats="1.2M in Rewards"
          statImageSrc="/images/steps/earn.svg"
        />
      </li>
      <li>
        <Step
          number={4}
          title={"Shape the Future"}
          description={
            "Values are ranked by total ETH voted for. You can withdraw your ETH at any time"
          }
          stats={"100k+ Contributors"}
          statImageSrc="/images/steps/shape.svg"
        />
      </li>
    </ol>
  );
};

export default StepList;
